/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FCE8EE',
          100: '#FFCAD4',
          200: '#FFADBF',
          300: '#FF8AAA',
          400: '#FF6795',
          500: '#FF4281',
          600: '#E83A74',
          700: '#D03168',
          800: '#B8295C',
          900: '#A02050',
        },
        secondary: {
          50: '#F0F0FF',
          100: '#E6E6FF',
          200: '#D1D1FF',
          300: '#B8B8FF',
          400: '#9E9EFF',
          500: '#8585FF',
          600: '#7070E8',
          700: '#5C5CD0',
          800: '#4848B8',
          900: '#3A3AA0',
        },
        accent: {
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE499',
          300: '#FFD666',
          400: '#FFC933',
          500: '#FFBB00',
          600: '#E8AA00',
          700: '#D09900',
          800: '#B88800',
          900: '#A07700',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};