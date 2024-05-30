/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        mainWidth: '1220px'
      },
      backgroundColor: {
        main: '#ee3131',
        inputField: '#f6f6f6',
        overlay: 'rgba(0, 0, 0, 0.3)',
      },
      colors: {
        main: '#ee3131',
        textColor: '#1c1d1d'
      }
    },
    variants: {
      borderWidth: ['responsive', 'last', 'hover', 'focus'],
    },
  },
  plugins: [],
}