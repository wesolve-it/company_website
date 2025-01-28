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
        'customer-gray': '#ddd'
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

