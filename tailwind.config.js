/** @type {import('tailwindcss').Config} */
// Tokens idénticos a portfolio-hever. Cualquier cambio aquí debe reflejarse allá.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F4F1EA",
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        accent: "#FF3B1F",
        lime: "#D4FF3B",
        cobalt: "#2540FF",
        cream: "#F4F1EA",
        smoke: "#6B7280",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "Georgia", "serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        brut: "8px 8px 0 0 #0A0A0A",
        "brut-sm": "4px 4px 0 0 #0A0A0A",
        "brut-lg": "12px 12px 0 0 #0A0A0A",
        "brut-accent": "8px 8px 0 0 #FF3B1F",
        "brut-cobalt": "8px 8px 0 0 #2540FF",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
