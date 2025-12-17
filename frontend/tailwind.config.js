/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          indigo: '#1C1F4A',
          teal: '#00B1AE',
          sky: '#EAF7F9',
        },
        accent: {
          blue: '#40C4FF',
          orange: '#FF8C42',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}