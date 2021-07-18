module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
   
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        gray: {
          700: '#737380',
          500: '#a8a8b3',
          400: '#e2e2e2',
        },
        red: '#ea4335',
        purple: '#835afd',
        white: '#ffff',
        pink: {
          500: '#e559f9',
        },
      },
      fontFamily: {
        poppins: ['Poppins']
      }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

