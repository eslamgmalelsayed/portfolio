/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: {
          light: '#60a5fa', // Blue
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        secondary: {
          light: '#a78bfa', // Purple
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed',
        },
        accent: {
          light: '#34d399', // Green
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        // Dark mode specific colors
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          border: '#2e2e2e',
          text: {
            primary: '#f3f4f6',
            secondary: '#d1d5db',
            muted: '#9ca3af',
          }
        },
        light: {
          bg: '#ffffff',
          surface: '#f9fafb',
          border: '#e5e7eb',
          text: {
            primary: '#111827',
            secondary: '#4b5563',
            muted: '#6b7280',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'custom-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
