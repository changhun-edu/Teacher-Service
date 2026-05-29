import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18212f",
        muted: "#607086",
        line: "#d8e0ea",
        brand: {
          50: "#eef8f5",
          100: "#d8f0e8",
          600: "#16846f",
          700: "#126a5b"
        },
        amber: {
          soft: "#fff4d8"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(18, 36, 56, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
