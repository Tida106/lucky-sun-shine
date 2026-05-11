/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gold-tuned scale (user spec): light #E8D4A8, main #C9A96E, dark #B8935A.
        // Mapped onto the `amber` keys so existing utility classes
        // (text-amber-700, border-amber-200, …) shift palette without
        // mass-rewriting every component.
        amber: {
          50:  '#FAF4E6',
          100: '#F4E9D1',
          200: '#E8D4A8',
          300: '#DCBE85',
          400: '#D2B07A',
          500: '#C9A96E',
          600: '#B8935A',
          700: '#9C7A47',
          800: '#6E5631',
          900: '#463620',
        },
        // Brand alias — same palette under a friendlier name for new code.
        gold: {
          light: '#E8D4A8',
          DEFAULT: '#C9A96E',
          dark: '#B8935A',
        },
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
        sans:    ['var(--font-sans-jp)', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-serif-jp)', '"Noto Serif JP"', 'Georgia', 'serif'],
        display: ['var(--font-serif-jp)', '"Noto Serif JP"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        heading: '0.05em',
      },
      lineHeight: {
        relaxed: '1.8',
      },
      backgroundImage: {
        'sun-radial': 'radial-gradient(circle at top, #fff4d6 0%, #ffe4a3 35%, #ffd166 70%, #ffb627 100%)',
      },
    },
  },
  plugins: [],
};
