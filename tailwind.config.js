const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const forms = require("@tailwindcss/forms")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        specttra: {
          yellow: "#e8aa00",
          gray: "#343434",
          red: "#c1292e",
          orange: "#e8501d",
          amber: "#f29104",
          "secondary-yellow": "#f8b133",
          "gradient-left": "#e8aa00",
          "gradient-right": "#b87609",
          gradient: "linear-gradient(to right, #e8aa00, #b87609);",
          "section-gray": "#f5f5f5",
          "bg-logo-gray": "#bdbcbc",
        },
      },
      fontFamily: {
        sans: ["eurostile", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
}
