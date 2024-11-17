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
          100: "#EEF5F8",
          200: "#FFE0B8",
          300: "#CBE3EF",
          400: "#FFAE47",
          500: "#227297",
          600: "#04567D",
          700: "#034E70",
          800: "#034564",
          900: "#193f5a",
        },
        secondary: {
          500: "#FF8800",
        },
        teal: {
          100: "#D7EBE5",
          600: "#20B098",
        },
      },
    },
  },
  plugins: [],
};
export default config;
