const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#0b0d12',
        'purple-highlight': '#292d3e;',
        'purple-slight-dark': '#303448',
        'violet-strong': '#5332e6',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
