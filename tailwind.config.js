/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-sage": "#C1D3C4",
        "brand-sky": "#D8E8E8",
        "brand-sand": "#E8E1D8",
        "brand-cream": "#F5F5F0",
        "sand-100": "#fcfaf8",
        "sand-200": "#f5f0e6",
        "sand-300": "#eaddc5",
        "sand-400": "#dcb78e",
        "sand-500": "#ce965e",
        "sand-600": "#b17446",
        "sand-700": "#93583a",
        "sand-800": "#784733",
        "sand-900": "#613a2a",
        "brand-dark": "#2c2c2c",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
