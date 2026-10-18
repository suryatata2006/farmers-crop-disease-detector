/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#fdfbf7',
          100: '#f7f2ea',
          200: '#efe6d5',
          300: '#e1d2b7',
          400: '#cbb692',
          500: '#b89c72',
          600: '#a3845b',
          700: '#85694a',
          800: '#6d543e',
          900: '#5a4635',
        }
      }
    },
  },
  plugins: [],
}
