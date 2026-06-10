/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B2B24',
          deep: '#0D1210',
          light: '#5E8A72',
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
          DEFAULT: '#161411',
          muted: '#615C53',
          faint: '#9A9286',
        },
        midnight: {
          DEFAULT: '#17131A',
          deep: '#0D1210',
          soft: '#2A242E',
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
        display: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(22, 20, 17, 0.08)',
        pramana: '0 24px 80px -30px rgba(13, 18, 16, 0.52)',
        green: '0 12px 34px -14px rgba(27, 43, 36, 0.52)',
        glow: '0 0 48px -8px rgba(201, 168, 76, 0.35)',
        card: '0 8px 40px -8px rgba(22, 20, 17, 0.15)',
        rose: '0 8px 32px -4px rgba(184, 92, 56, 0.22)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh':
          'radial-gradient(at 12% 20%, rgba(201, 168, 76, 0.16) 0px, transparent 42%), radial-gradient(at 82% 12%, rgba(94, 138, 114, 0.12) 0px, transparent 38%), radial-gradient(at 70% 82%, rgba(184, 92, 56, 0.12) 0px, transparent 44%), linear-gradient(180deg, #FFFCF5 0%, #F8F2E8 100%)',
        emotional:
          'linear-gradient(135deg, #0D1210 0%, #17131A 52%, #1B2B24 100%)',
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
