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
        "dark-emerald": "#022C22",
        "emerald-green": "#10B981",
        "mint-glass": "#A7F3D0",
        "mint-white": "#ECFDF5",
        "light-bg": "#F0FDF4",
        "light-text-dark": "#064E3B",
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 30s linear infinite",
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      }
      },
    },
  },
  plugins: [],
};
