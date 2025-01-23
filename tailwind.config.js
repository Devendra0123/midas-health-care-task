/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'purple': "#524F91",
        'orange': "#F7931D",
        'teal': "#20BEEE"
      }
    },
  },
  plugins: [],
}