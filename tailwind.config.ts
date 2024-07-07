import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0E2439",
        darkhover: "#9CB3C9",
      },
      keyframes: {
        hangingWiggle: {
          "0%, 100%": {
            transform: "rotate(0deg)",
            transformOrigin: "top left",
          },
          "25%": { transform: "rotate(5deg)", transformOrigin: "top left" },
          "50%": { transform: "rotate(-5deg)", transformOrigin: "top left" },
          "75%": { transform: "rotate(5deg)", transformOrigin: "top left" },
        },
      },
      animation: {
        hangingWiggle: "hangingWiggle 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
