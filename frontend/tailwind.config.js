/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff4f4f',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
        text: '#E1E1E6',
        background: {
          100: '#121214',
          200: '#202024',
          300: '#29292e',
        },
      },
    },
  },
  plugins: [],
}
