import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'InterVariable'", ...fontFamily.sans],
      },
      colors: {
        background: "#fcfcfd",
        foreground: "#0f172a",
        muted: "#e2e8f0",
        accent: "#2563eb",
      },
      borderRadius: {
        "2xl": "1.25rem"
      },
      boxShadow: {
        card: "0 20px 40px -20px rgba(15, 23, 42, 0.2)"
      },
      transitionDuration: {
        DEFAULT: "300ms"
      }
    },
  },
  plugins: [],
};

export default config;
