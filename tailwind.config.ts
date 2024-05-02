import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/lib/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  plugins: [],
} satisfies Config;

export default config;
