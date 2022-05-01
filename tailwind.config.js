module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'low': ['0 10px 15px -3px rgb(0 0 0 / 0.06)', '0 4px 6px -4px rgb(0 0 0 / 0.06)']
      }
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          // paddingLeft: '2rem',
          // paddingRight: '2rem',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        }
      })
    }
  ]
}