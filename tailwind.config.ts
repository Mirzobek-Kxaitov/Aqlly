import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1F2937",
        ink2: "#374151",
        muted: "#6B7280",
        faint: "#9CA3AF",
        paper: "#FFF8EC",
        bg: "#F9FAFB",
        line: {
          DEFAULT: "#E5E7EB",
          soft: "#F3F4F6"
        },
        brand: {
          DEFAULT: "#F59E0B",
          dark: "#B45309",
          soft: "#FEF3C7",
          tint: "#FFFBEB"
        },
        ok: {
          DEFAULT: "#10B981",
          soft: "#D1FAE5"
        },
        warn: "#F97316",
        bad: {
          DEFAULT: "#EF4444",
          soft: "#FEE2E2"
        },
        quiz: {
          red: "#EF4444",
          green: "#10B981",
          blue: "#3B82F6",
          purple: "#8B5CF6"
        }
      },
      fontFamily: {
        sans: ["Nunito", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["Caveat", "cursive"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        lift: "0 18px 50px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
