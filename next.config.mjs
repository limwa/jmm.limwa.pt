/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  experimental: {
    useCache: true,
    viewTransition: true,
  },
};

export default nextConfig;
