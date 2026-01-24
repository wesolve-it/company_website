/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*html",
    "./parts/**/*.html",
    "./js/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-light": "#f8fafc",
        "brand-accent": "#84cc16",
        "brand-primary": "#0ea5e9",
        "brand-text": "#0f172a"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"]
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 10s ease-in-out infinite",
        "scroll": "scroll 40s linear infinite"
      },
      keyframes: {
        float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 1.5rem))" },
        }
      },
    },
  },
  plugins: [],
};
