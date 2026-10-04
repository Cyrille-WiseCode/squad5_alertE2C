/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B1F3B',
        blue: '#2C3E8C',
        yellow: '#F4B436',
        orange: '#E8482E',
        green: '#1F9D55',
        cream: '#F7F6F0'
      }
    }
  },
  plugins: []
}
