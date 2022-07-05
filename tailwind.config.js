const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    }
  })
});


function getThemeColors(theme) {
  return {
    'transparent': 'transparent',
    'current': 'currentColor',
    'white': 'white',
    'black': 'black',
    'primary': theme === 'dark' ? '#BF7A7A' : '#ff0000',
    'secondary': '#7A7C7F',
    'background-1': theme === 'dark' ? '#272727' : '#eeeeee',
    'background-2': theme === 'dark' ? '#222222' : 'white',
    'background-3': theme === 'dark' ? '#393B3D' : '#cccccc',
    'background-4': theme === 'dark' ? '#393B3D' : '#f4f4f4',
    'background-5': theme === 'dark' ? '#2b2b2b' : '#f4f4f4',
    'foreground-1': theme === 'dark' ? '#A5A6A6' : '#666666', 
    'foreground-2': theme === 'dark' ? '#5F6062' : '#5F6062',
    'tag-1': theme === 'dark' ? '#ff0000': '#660000', 
    'tag-2': theme === 'dark' ? '#00ff00': '#ff0000', 
    'tag-3': theme === 'dark' ? '#3F9258': '#3F9258', 
    'tag-1-highlight': theme === 'dark' ? '#660000': '#999999',
    'tag-2-highlight': theme === 'dark' ? '#3F9258': '#1F482B',
    'tag-3-highlight': theme === 'dark' ? '#3F9258': '#201F48'
  }
}


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // colors: getThemeColors('dark'),
    colors: getThemeColors('light'),
    extend: {
      animation: {
        'bounce-slow-1': 'bounce 3s infinite',
        'bounce-slow-2': 'bounce 4s infinite',
        'bounce-slow-3': 'bounce 3.5s infinite'
      },
      fontFamily: {
        'display': ['Oswald'],
        'body': ['"Open Sans"'],
      }
    },
    fontFamily: {
      'display': ['Oswald'],
      'body': ['Open Sans'],
      'rhaz': ['Avenir']
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
