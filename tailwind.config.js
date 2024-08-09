/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        currentTheme: {
          100: '#cdb5ff',
          200: '#c2a3fd',
          300: '#a796e8',
          400: "#896deb",
          500: '#6b66c6'
        }
      },
      screens: {
        'bp': '720px'
      }
    },
  },
  plugins: [],
}