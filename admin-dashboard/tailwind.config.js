/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#2EB1E8',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
				outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}