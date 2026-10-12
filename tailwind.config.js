/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./js/**/*.{js,ts}",
    "./navigation.html",
    "./**/*.html",
    "./referenzen/**/*.html",
    "./leistungen/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'wesolve-green': {
          '50': '#f4f8f6',
          '100': '#e6f0eb',
          '200': '#cbe0d5',
          '300': '#a7c9b8',
          '400': '#78aa92',
          '500': '#4d8b6d',
          '600': '#326d52',
          '700': '#245540', // primary
          '800': '#193e30',
          '900': '#102d23',
          '950': '#081c16',
        },
        'wesolve-gray': {
          '50': '#f6f6f7',
          '100': '#efeff0',
          '200': '#e1e2e4',
          '300': '#cecfd3',
          '400': '#bbbbc1', // primary
          '500': '#a7a6ae',
          '600': '#93919a',
          '700': '#7f7d85',
          '800': '#67676c',
          '900': '#56555a',
          '950': '#323234',
        },
        'wesolve-accent': {
          '50': '#edfcf7',
          '100': '#d3f8eb',
          '200': '#abefd8',
          '300': '#73dfbf',
          '400': '#36c99a',
          '500': '#19ad7f', // Akzent
          '600': '#0e8c68',
          '700': '#0e7056',
          '800': '#105945',
          '900': '#104a3b',
        },
        'wesolve-accent-coral': {
          '50': '#edfcf7',
          '100': '#d3f8eb',
          '200': '#abefd8',
          '300': '#73dfbf',
          '400': '#36c99a',
          '500': '#19ad7f',
          '600': '#0e8c68',
          '700': '#0e7056',
          '800': '#105945',
          '900': '#104a3b',
        },
        'wesolve-sun': {
          '100': '#fff4cc',
          '200': '#ffe78f',
          '300': '#ffd95a',
          '400': '#ffc929', // Akzent: Markierungen, Haken, CTA
          '500': '#f0b400',
        },
        'bg-gray': '#161616',
        'section-gray': '#282828',
        // 'nav-gray': '#b9b8be',
        'customer-gray': '#ddd',
        // 'nav-gray': '#ccccd1'
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        // Startseite: Onest für Überschriften und Fließtext
        text: ['Onest', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
        'ticker': 'infinite-scroll 22s linear infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
