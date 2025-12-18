/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-sage": "#C1D3C4",
        "brand-sky": "#D8E8E8",
        "brand-sand": "#E8E1D8",
        "brand-cream": "#F5F5F0", // Slightly warmer off-white
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
