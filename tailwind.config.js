/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.{js,ts}",
    "./navigation.html",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'wesolve-green': '#314f3e',
        'wesolve-gray': '#bbbbc1',
        'bg-gray': '#161616',
        'section-gray': '#282828',
        'nav-gray': '#b9b8be',
        'customer-gray': '#ddd',
        'nav-gray': '#ccccd1'
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Montserrat', 'sans-serif']
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}

