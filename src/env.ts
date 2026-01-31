import { z } from "zod";

const schema = z.intersection(
  z.object({
    APP_TITLE: z
      .string()
      .default("jmm compiler")
      .describe(
        "The title of the website. Appears in the browser tab and website header.",
      ),

    APP_DESCRIPTION: z
      .string()
      .default("An application to compile Java-- code")
      .describe(
        "The description of the website. Appears in search engine results.",
      ),

    ADMIN_CONTACT_INFO: z
      .string()
      .optional()
      .describe(
        "The contact information for the administrator. Displayed when there is an internal server error in the compilation process.",
      ),

    JMM_ENTRYPOINT: z
      .string()
      .default("./jmm/bin/jmm")
      .describe("The entrypoint for the compiler."),

    JMM_EXTRA_ARGS: z
      .string()
      .optional()
      .transform((v) => v?.split(":/:").filter((v) => !!v) ?? [])
      .pipe(z.array(z.string()))
      .describe(
        "Extra arguments passed to the compiler during compilation. Arguments must be separated using `:/:`. Example: `-d:/:--pretty`.",
      ),

    WEBSITE_BASE_URL: z
      .string()
      .default("http://localhost:3000")
      .describe("The base URL for the JMM website."),

    ADMIN_ENCRYPTION_KEY_HEX: z
      .string()
      .default(
        "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      ) // for "password" password
      .refine((val) => /^[0-9a-fA-F]{64}$/.test(val), {
        message:
          "ADMIN_ENCRYPTION_KEY_HEX must be a 64-character hexadecimal string.",
      })
      .describe(
        "The encryption key used to encrypt error messages shown to the administrator. Must be a SHA-256 hash, represented as a 64-character hexadecimal string.",
      ),
  }),
  z.discriminatedUnion("ANALYTICS_PROVIDER", [
    z.object({
      ANALYTICS_PROVIDER: z.undefined().describe("Do not use analytics."),
    }),
    z.object({
      ANALYTICS_PROVIDER: z
        .literal("cloudflare")
        .describe("Use cloudflare as the analytics provider."),

      CLOUDFLARE_ANALYTICS_TOKEN: z
        .string()
        .describe(
          "The token for the Cloudflare analytics provider. Required if ANALYTICS_PROVIDER is set to 'cloudflare'.",
        ),
    }),
  ]),
);

export const env = validate({
  JMM_EXTRA_ARGS: process.env.JMM_EXTRA_ARGS,
  JMM_ENTRYPOINT: process.env.JMM_ENTRYPOINT,
  ANALYTICS_PROVIDER: process.env.ANALYTICS_PROVIDER,
  CLOUDFLARE_ANALYTICS_TOKEN: process.env.CLOUDFLARE_ANALYTICS_TOKEN,
  APP_TITLE: process.env.APP_TITLE,
  APP_DESCRIPTION: process.env.APP_DESCRIPTION,
  ADMIN_CONTACT_INFO: process.env.ADMIN_CONTACT_INFO,
  WEBSITE_BASE_URL: process.env.WEBSITE_BASE_URL,
  ADMIN_ENCRYPTION_KEY_HEX: process.env.ADMIN_ENCRYPTION_KEY_HEX,
});

/* ##################################### */

type UnionKeys<T> = T extends unknown ? keyof T : never;
type EnvMap = Record<UnionKeys<z.input<typeof schema>>, string | undefined>;

function preprocess(obj: EnvMap): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      // Set empty strings to unknown
      if (value === "") {
        return [key, undefined];
      }

      return [key, value];
    }),
  );
}

function validate(obj: EnvMap) {
  const preprocessed = preprocess(obj);
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return preprocessed as z.output<typeof schema>;
  }

  return schema.parse(preprocessed);
}
