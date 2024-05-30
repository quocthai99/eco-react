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
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
      },
    },
    variants: {
      borderWidth: ['responsive', 'last', 'hover', 'focus'],
    },
  },
  plugins: [],
}