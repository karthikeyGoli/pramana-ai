/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173C2B',
          deep: '#0B2118',
          light: '#2E7D52',
        },
        pale: {
          DEFAULT: '#E8F5EE',
          warm: '#F2F8F1',
        },
        gold: {
          DEFAULT: '#C9A84C',
          soft: '#F7E8B5',
        },
        terracotta: {
          DEFAULT: '#B85C38',
          soft: '#F7E4DA',
        },
        cream: {
          DEFAULT: '#FFFCF5',
          warm: '#F8F2E8',
          sand: '#EEE2D0',
        },
        ink: {
          DEFAULT: '#181915',
          muted: '#5F665B',
          faint: '#92998D',
        },
        midnight: {
          DEFAULT: '#181915',
          deep: '#0B2118',
          soft: '#2F332B',
        },
        plum: {
          DEFAULT: '#4A2D6E',
          light: '#6B4D8A',
          soft: '#EDE7F6',
        },
        rose: {
          DEFAULT: '#B85C38',
          bright: '#D6704B',
          soft: '#F7E4DA',
        },
        blush: {
          DEFAULT: '#FFFCF5',
          deep: '#F7E8B5',
        },
        violet: {
          DEFAULT: '#6C7760',
          soft: '#E8F5EE',
        },
        sage: {
          DEFAULT: '#6C8F73',
          muted: '#A8BFAE',
          soft: '#E8F5EE',
        },
        teal: {
          shadow: '#173C2B',
          tone: '#2E7D52',
          mist: '#E8F5EE',
        },
        lavender: {
          DEFAULT: '#A8BFAE',
          soft: '#E8F5EE',
        },
        coral: {
          DEFAULT: '#B85C38',
          soft: '#F7E4DA',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(23, 60, 43, 0.08)',
        pramana: '0 20px 70px -28px rgba(23, 60, 43, 0.45)',
        green: '0 12px 34px -14px rgba(23, 60, 43, 0.55)',
        glow: '0 0 48px -8px rgba(201, 168, 76, 0.35)',
        card: '0 8px 40px -8px rgba(23, 60, 43, 0.15)',
        rose: '0 8px 32px -4px rgba(184, 92, 56, 0.22)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh':
          'radial-gradient(at 12% 20%, rgba(201, 168, 76, 0.18) 0px, transparent 42%), radial-gradient(at 82% 12%, rgba(46, 125, 82, 0.16) 0px, transparent 38%), radial-gradient(at 70% 82%, rgba(184, 92, 56, 0.14) 0px, transparent 44%), linear-gradient(180deg, #FFFCF5 0%, #F8F2E8 100%)',
        emotional:
          'linear-gradient(135deg, #0B2118 0%, #173C2B 55%, #2E7D52 100%)',
        cta:
          'linear-gradient(135deg, #F7E8B5 0%, #C9A84C 45%, #E3C96A 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
