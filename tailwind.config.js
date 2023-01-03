

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Rajdhani', 'sans-serif'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/aspect-ratio'),],
}
 