import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF9F0",
          100: "#FFF0DB",
          200: "#FFE0B8",
          300: "#CBE3EF",
          400: "#FFAE47",
          500: "#227297",
          600: "#F07006",
          700: "#034E70",
          800: "#034564",
          900: "#193f5a",
        },
        secondary: {
          500: "#FF8800",
        },
      },
    },
  },
  plugins: [],
};
export default config;
