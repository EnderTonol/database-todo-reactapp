// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/button.js",
    './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};