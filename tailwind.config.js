/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          blue: '#232F3E',
          orange: '#FF9900',
          yellow: '#FEBD69',
        }
      }
    },
  },
  plugins: [],
}
