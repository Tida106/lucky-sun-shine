/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sun: {
          50:  '#fffaf0',
          100: '#fff4d6',
          200: '#ffe4a3',
          300: '#ffd166',
          400: '#ffb627',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#7c4a05',
          900: '#4d2d00',
        },
        rose: {
          glow: '#ff6f91',
        },
        ink: {
          900: '#1a1410',
          700: '#3b322a',
          500: '#6b5d50',
        },
      },
      fontFamily: {
        sans:    ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
        serif:   ['"Noto Serif JP"', 'Georgia', 'serif'],
        display: ['"Shippori Mincho"', '"Noto Serif JP"', 'serif'],
      },
      backgroundImage: {
        'sun-radial': 'radial-gradient(circle at top, #fff4d6 0%, #ffe4a3 35%, #ffd166 70%, #ffb627 100%)',
      },
    },
  },
  plugins: [],
};
