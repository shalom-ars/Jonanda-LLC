/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08080b',
          subtle: '#0c0c10',
          card: '#111117',
          surface: '#16161f',
          elevated: '#1c1c28',
          border: 'rgba(255, 255, 255, 0.08)'
        },
        surface: {
          DEFAULT: '#16161f',
          card: '#111117',
          subtle: '#0c0c10',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#D4AF37',
          metallic: '#C59B27',
          bright: '#F3BA2F',
          dark: '#9A7B1C'
        },
        brand: {
          accent: '#EAB308',
          glow: 'rgba(234, 179, 8, 0.15)',
          border: 'rgba(234, 179, 8, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3BA2F 0%, #D4AF37 50%, #9A7B1C 100%)',
        'gold-subtle': 'linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(212, 175, 55, 0.03) 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(16, 16, 23, 0.8) 0%, rgba(8, 8, 11, 0.95) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px -3px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 0 25px -5px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 0 40px -10px rgba(212, 175, 55, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px -5px rgba(212, 175, 55, 0.15)'
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
