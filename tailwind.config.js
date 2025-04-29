/** @type {import('tailwindcss').Config} */
module.exports = {
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
          '50': '#f2f7f4',
          '100': '#e0ebe2',
          '200': '#c3d7c8',
          '300': '#9bbaa5',
          '400': '#70977e',
          '500': '#4f7a60',
          '600': '#3b604a',
          '700': '#314f3e', // primary
          '800': '#273e31',
          '900': '#213329',
          '950': '#121c17',
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
          '50': '#fffaf0',
          '100': '#fef3c7',
          '200': '#fde68a',
          '300': '#fcd34d',
          '400': '#fbbf24',
          '500': '#f59e0b', // CTA-Stufe
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#78350f',
        },
        'wesolve-accent-coral': {
          '50': '#fff1f0',
          '100': '#ffe0dc',
          '200': '#ffc2b9',
          '300': '#ff9e8f',
          '400': '#ff7a65',
          '500': '#ff573b', // Primär
          '600': '#e0442d',
          '700': '#b53523',
          '800': '#8c291b',
          '900': '#6f2015',
        },
        'bg-gray': '#161616',
        'section-gray': '#282828',
        // 'nav-gray': '#b9b8be',
        'customer-gray': '#ddd',
        // 'nav-gray': '#ccccd1'
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

