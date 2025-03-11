import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  content: [
    "./src/lib/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  plugins: [animate],
} satisfies Config;

export default config;
