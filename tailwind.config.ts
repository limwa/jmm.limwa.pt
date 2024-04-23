import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/lib/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  plugins: [],
};
export default config;
