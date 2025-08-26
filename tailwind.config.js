/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'eva-orange': '#FF9F43',
        'eva-text': '#4F5E71',
        'eva-heading': '#2D3643',
        'eva-yellow': {
          light: '#FFF8E7',
          DEFAULT: '#FFB648',
        },
        'eva-green': {
          light: '#F0FFF7',
          DEFAULT: '#00875A',
        },
        'eva-blue': '#0052CC',
        'eva-border': '#E6E8EC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Main headings
        'h1': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],      // 32px
        'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],      // 24px
        'h3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],  // 20px
        'h4': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],  // 18px
        
        // Body text
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'body': ['1rem', { lineHeight: '1.5rem' }],          // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        
        // Supporting text
        'caption': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'overline': ['0.625rem', { lineHeight: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }], // 10px
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(255, 200, 61, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 0 8px rgba(255, 200, 61, 0)' 
          }
        },
        'slide-in-right': {
          'from': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          'to': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0.3)',
            opacity: '0'
          },
          '50%': {
            transform: 'scale(1.05)'
          },
          '70%': {
            transform: 'scale(0.9)'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'slide-in-left': {
          'from': {
            transform: 'translateX(-100%)'
          },
          'to': {
            transform: 'translateX(0)'
          }
        },
        'slide-in-up': {
          'from': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          'to': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        'bounce-x': {
          '0%, 100%': {
            transform: 'translateX(0)'
          },
          '50%': {
            transform: 'translateX(4px)'
          }
        },
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-102': {
          'to': { transform: 'scale(1.02)' }
        },
        'scale-98': {
          'to': { transform: 'scale(0.98)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-up': 'slide-in-up 0.4s ease-out',
        'bounce-x': 'bounce-x 1s infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'scale-102': 'scale-102 0.2s ease-out forwards',
        'scale-98': 'scale-98 0.1s ease-out forwards'
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',
    'bg-red-200',
    'bg-orange-200',
    'ring-4',
    'ring-blue-200',
    'ring-green-200',
    'ring-red-200',
    'text-h1',
    'text-h2',
    'text-h3',
    'text-h4',
    'text-body-lg',
    'text-body',
    'text-body-sm',
    'text-caption',
    'text-overline',
    'animate-pulse-glow',
    'animate-slide-in-right',
    'animate-slide-in-left',
    'animate-slide-in-up',
    'animate-bounce-x',
    'animate-fade-in',
    'animate-bounce-in',
    'hover:scale-102',
    'active:scale-98'
  ]
};