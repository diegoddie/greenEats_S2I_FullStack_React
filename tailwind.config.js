/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat'],
        title: ['Satisfy'],
        subtitle: ['Indie Flower']
      }
    },
  },
  plugins: [],
})

