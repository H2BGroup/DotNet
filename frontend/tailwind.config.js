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
    },
  },
  plugins: [],
}
