/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D81B60',
        'primary-600': '#C2185B',
        purple: '#8A2BE2',
        lavender: '#7B2CBF',
        'lavender-light': '#f3e8ff',
        heading: '#5C0A1F',
        text: '#3A3A3A',
        muted: '#8F6C78',
        bg: '#FDECF2',
        'bg-soft': '#FFF5FA',
        'rose-200': '#F8BBD0',
        'rose-300': '#F48FB1',
        border: '#F2C6D6',
        pink: '#ffc0cb'
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        custom: '0 10px 30px rgba(216,27,96,0.12)',
      },
    },
  },
  plugins: [],
}
