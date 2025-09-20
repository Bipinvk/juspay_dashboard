/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        softBlue: '#e7f3fb',
        softGreen: '#e9fff3',
        softYellow: '#f4ecd9',
        softMint: '#e8fef0',
        primaryBorder: '#e5e7eb',
        buttonBg: '#2563eb'
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};
