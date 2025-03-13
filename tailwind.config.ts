import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      animation: {
        opacity: "opacity 0.4s linear both",
        "opacity-left": "opacity-left 0.4s linear both",
        modal: "modal 0.5s cubic-bezier(1,.04,.75,.99) forwards",
        "modal-out": "modal-out 0.2s cubic-bezier(.04,.41,.79,.65) forwards",
        "fade-in": "fade-in 0.5s cubic-bezier(1,.04,.75,.99) forwards",
        "fade-out": "fade-out 0.3s cubic-bezier(.04,.41,.79,.65) forwards",
      },
      keyframes: {
        opacity: {
          "0%": {
            opacity: "0",
            filter: "blur(10px)",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateY(0)",
          },
        },
        "opacity-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        modal: {
          "0%": {
            opacity: "1",
            transform: "scale(0.8) translateY(-130%)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0%)",
          },
        },
        "modal-out": {
          "0%": {
            opacity: "1",
            transform: "scale(1) translateY(0%)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(0.8) translateY(-100%)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        plusJakarta: ['"Plus Jakarta Sans"'],
      },
      colors: {
        side: "#FF8C35",
        neutral: {
          50: "#FFFFFF",
          60: "#6C757D",
          70: "#919191",
          100: "#FFFFFF",
          200: "#EDF2F7",
          300: "#E2E8F0",
          500: "#CBD5E0",
          600: "#A0AEC0",
          700: "#718096",
          800: "#4A5568",
          900: "#2D3748",
          950: "#1A202C",
        },
        primary: {
          default: "#597445",
          50: "#59C4BC",
          100: "#DDE6D5",
          200: "#CEE7F0",
          300: "#9DCEE0",
          400: "#6AB5D0",
          500: "#597445",
          600: "#32809C",
          700: "#28657C",
          800: "#1E4C5D",
          900: "#143440",
          950: "#0C1E24",
        },
        secondary: {
          default: "#252836",
          100: "#EEF1F6",
          200: "#DDE3ED",
          300: "#BBC7DB",
          400: "#9AACCA",
          500: "#7992B9",
          600: "#5978A9",
          700: "#3A5E98",
          800: "#1B4588",
          900: "#092E68",
          950: "#051A3D",
        },
        danger: {
          100: "#FCF2F2",
          200: "#F9E4E4",
          300: "#F3C6C6",
          400: "#EDA3A3",
          500: "#E77575",
          600: "#E12120",
          700: "#C91D1C",
          800: "#AE1918",
          900: "#8E1414",
          950: "#640E0E",
        },
        success: {
          default: "#1BB69C",
          accents: "#50D1AA",
          100: "#D9FFDB",
          200: "#E6F2EB",
          300: "#CAE5D7",
          400: "#AAD8C0",
          500: "#82C9A6",
          600: "#4FB053",
          700: "#388E3C",
          800: "#369068",
          900: "#2C7555",
          950: "#1F533C",
        },
        warning: {
          100: "#FFE4B7",
          200: "#FBF3E6",
          300: "#F8E7CB",
          400: "#F5DAAB",
          500: "#FFA000",
          600: "#EFBF4D",
          700: "#D5AA44",
          800: "#B9933B",
          900: "#977830",
          950: "#6A5522",
        },
        error: {
          100: "#FFC3C3",
          300: "#DB2F40",
          500: "#D32F2F",
          600: "#B11D1D",
        },
        alert: {
          "warning-bg": "#FFF3CD",
          "warning-border": "#FFECB5",
          "warning-text": "#664D03",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
