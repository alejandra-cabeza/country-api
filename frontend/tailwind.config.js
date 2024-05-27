/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6d97f1',
          dark: '#5b80e9'
        },
        secondary: {
          DEFAULT: '#95a3b6',
          light: '#D1D5DB',
          extraLight: '#F3F4F6',
          dark: '#72839f'
        },
        disabled: '#D1D5DB',
        error: '#EF4444'
      },
    },
  },
  plugins: [],
}