/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff4f4f',
        warning: '#f5a623',
        success: '#4cd964',
        danger: '#ff3b30',
        info: '#007aff',
        dark: '#000000',
        light: '#ffffff',
        text: '#E1E1E6',
        background: {
          100: '#d0d0d0',
          200: '#a0a0a1',
          300: '#717172',
          400: '#414143',
          500: '#121214',
          600: '#0e0e10',
          700: '#0b0b0c',
          800: '#070708',
          900: '#040404',
        },
      },
    },
  },
  plugins: [],
}
