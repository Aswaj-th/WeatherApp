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
          100: '#52D3D8',
          200: '#38419D',
          300: '#3887BE',
          400: "#008DDA",
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