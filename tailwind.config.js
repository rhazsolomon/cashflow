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
    'debug': 'rgba(255, 200, 200, 0.2)',
    'white': 'white',
    'black': 'black',
    // 'primary': theme === 'dark' ? '#BF7A7A' : 'red', // main background
    'secondary': '#7A7C7F',
    
    'background-1': theme === 'dark' ? '#272727' : '#dddddd', // main background
    'background-2': theme === 'dark' ? '#222222' : '#eeeeee', // sidebar
    'background-3': theme === 'dark' ? '#393B3D' : '#cccccc', // borders
    'background-4': theme === 'dark' ? '#393B3D' : '#f4f4f4', // input
    'background-5': theme === 'dark' ? '#2b2b2b' : '#f4f4f4', // hover

    'foreground-1': theme === 'dark' ? '#dddddd': '#666666', // text

    'tag-1': theme === 'dark' ? '#dddddd': '#DDDDDD', // unknown tag
    'tag-1-highlight': theme === 'dark' ? '#dddddd': '#999999', // unknown tag

    'tag-2': theme === 'dark' ? '#00ff00': '#ff0000', // red tag
    'tag-2-highlight': theme === 'dark' ? '#3F9258': '#1F482B',

    'tag-3': theme === 'dark' ? '#3F9258': '#3F9258', // green tag
    'tag-3-highlight': theme === 'dark' ? '#3F9258': '#201F48', // unknown tag
  }
}


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: getThemeColors('dark'),
    // colors: getThemeColors('light'),
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
