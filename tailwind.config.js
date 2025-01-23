/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line if you have different file extensions
  ],
  theme: {
    extend: {
      color: {
        primary: {
          DEFAULT: '#F5385D', // Default color
        },
      }
    },
  },
  plugins: [],
}