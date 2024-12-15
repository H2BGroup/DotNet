/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Light blue for primary
        warning: '#f5a623', // Amber for warnings
        success: '#10b981', // Green for success
        danger: '#ef4444', // Red for danger
        info: '#2563eb', // Blue for informational messages
        dark: '#1a1a1a', // Dark text for readability
        light: '#ffffff', // White background
        text: '#1a1a1a', // Neutral dark text
        background: {
          100: '#ffffff', // Pure white
          200: '#f9fafb', // Near-white
          300: '#f3f4f6', // Light gray
          400: '#e5e7eb', // Gray for borders
          500: '#d1d5db', // Muted gray
          600: '#9ca3af', // Slightly darker gray
          700: '#6b7280', // Medium gray for muted text
          800: '#374151', // Dark gray for secondary text
          900: '#1f2937', // Darkest gray
        },
      },
      animation: {
        'flash-green': 'flash-green 0.65s',
        'flash-red': 'flash-red 0.65s',
      },
      keyframes: {
        'flash-green': {
          '0%': {
            borderColor: '#d1d5db', // Initial gray (default)
            boxShadow: '0 0 10px #d1d5db', // Soft initial shadow
          },
          '20%': {
            borderColor: '#b3c9b3', // Lighter greenish gray
            boxShadow: '0 0 10px #b3c9b3', // Light shadow
          },
          '40%': {
            borderColor: '#97c097', // Slightly more saturated green
            boxShadow: '0 0 15px #97c097', // Lighter green shadow
          },
          '60%': {
            borderColor: '#7bb77b', // A clear green color
            boxShadow: '0 0 20px #7bb77b', // Stronger green shadow
          },
          '80%': {
            borderColor: '#5fa75f', // Darker green
            boxShadow: '0 0 25px #5fa75f', // Strong green shadow
          },
          '100%': {
            borderColor: '#d1d5db', // Returning to the initial gray
            boxShadow: '0 0 10px #d1d5db', // Soft initial shadow
          },
        },
        'flash-red': {
          '0%': {
            borderColor: '#d1d5db', // Initial gray (default)
            boxShadow: '0 0 10px #d1d5db', // Soft initial shadow
          },
          '20%': {
            borderColor: '#f3b0b0', // Lighter red-ish gray
            boxShadow: '0 0 10px #f3b0b0', // Light red shadow
          },
          '40%': {
            borderColor: '#f08080', // More saturated red
            boxShadow: '0 0 15px #f08080', // Lighter red shadow
          },
          '60%': {
            borderColor: '#e06060', // A clear red color
            boxShadow: '0 0 20px #e06060', // Stronger red shadow
          },
          '80%': {
            borderColor: '#d04040', // Darker red
            boxShadow: '0 0 25px #d04040', // Strong red shadow
          },
          '100%': {
            borderColor: '#d1d5db', // Returning to the initial gray
            boxShadow: '0 0 10px #d1d5db', // Soft initial shadow
          },
        },
      },
    },
  },
  plugins: [],
}
