module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
   
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        gray: '#a8a8b3',
        red: '#ea4335',
        purple: '#835afd',
        white: '#ffff',
        black: {
          light:'#737380',
        },
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

