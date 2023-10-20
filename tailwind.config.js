const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#0b0d12',
        'purple-highlight': '#292d3e;'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
