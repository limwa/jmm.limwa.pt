ARG JMM_STRATEGY=copy
FROM node:22-alpine AS base
WORKDIR /app

FROM base AS copy

COPY ./compiler compiler

FROM base AS download

ARG JMM_URL
RUN wget ${JMM_URL} -O compiler.zip

RUN unzip compiler.zip -d compiler

FROM gradle:alpine AS git
WORKDIR /app

RUN apk add --no-cache git

ARG JMM_URL
ARG JMM_BRANCH
RUN git clone --single-branch ${JMM_BRANCH:+--branch $JMM_BRANCH} ${JMM_URL} compiler_git

RUN cd compiler_git && gradle installDist

RUN mkdir -p compiler && cp -r compiler_git/config.properties compiler_git/build/install/jmm compiler/

FROM ${JMM_STRATEGY} AS strategy

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder

COPY ./public ./public
COPY ./src ./src
COPY \
  .eslintrc \
  next-env.d.ts \
  next.config.mjs \
  postcss.config.mjs \
  rsc.d.ts \
  tailwind.config.ts \
  tsconfig.json \
  ./

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml ./

# Skip environment variable validation during build
ENV SKIP_ENV_VALIDATION=true

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner

RUN apk add --no-cache openjdk21-jre

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=strategy --chown=nextjs:nodejs /app/compiler /app/compiler

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
