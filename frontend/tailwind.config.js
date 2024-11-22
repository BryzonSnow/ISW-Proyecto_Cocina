/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        brightColor: "#AB6B2E",
        backgroundColor: "#FDE9CC",

      },
    },
  },
  plugins: [],
}

