import { fontFamily } from "tailwindcss/defaultTheme"
import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@teovilla/shadcn-ui-*/**/*.tsx", // This is crucial for this to work :)
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        primary: "#f0c905",
        secondary: "#18191A",
        tertiary: "#ffffff",
        quaternary: "#f29f05",
        backgroundLight: "#F0F2F5",
        backgroundDark_primary: "#242526",
        backgroundDark_secondary: "#4E4F50",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
