import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — Jenny Henderson Studio
        lace: '#F8F8F7',       // near-white — main background
        roasted: '#3D4B6B',    // Blue navy — primary text + dark elements
        butter: '#E8A09A',     // Coral — accent, highlights, CTAs
        oyster: '#C5C9E8',     // Periwinkle — cool secondary sections
        // Utility tones
        'roasted-dark': '#2A3354',
        'roasted-mid': '#323E60',
        'text-muted': '#8898A8',   // Smoke
        'text-faint': '#A8B5C4',
        'border-subtle': 'rgba(61,75,107,0.08)',
        'surface-white': '#FFFFFF',
      },
      fontFamily: {
        // SWAP: Replace 'var(--font-display)' with LUNALENA font files once acquired
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // SWAP: Replace 'var(--font-heading)' with Hatton font files once acquired
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        // YSABEAU INFANT — loaded via Google Fonts
        body: ['var(--font-body)', 'Georgia', 'serif'],
        // SWAP: Replace 'var(--font-label)' with Molenilo font files once acquired
        label: ['var(--font-label)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(64px, 10vw, 120px)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(48px, 7vw, 88px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'h1': ['clamp(40px, 5.5vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'h2': ['clamp(28px, 3.5vw, 48px)', { lineHeight: '1.1', letterSpacing: '-0.005em' }],
        'h3': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.2' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body': ['16px', { lineHeight: '1.65' }],
        'label': ['12px', { lineHeight: '1', letterSpacing: '0.08em' }],
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      borderRadius: {
        'card': '20px',
        'btn': '999px',
        'tag': '6px',
      },
      boxShadow: {
        'stamp': '0 8px 32px rgba(61,75,107,0.18), 0 2px 8px rgba(61,75,107,0.10)',
        'card': '0 2px 16px rgba(61,75,107,0.08)',
        'card-hover': '0 8px 32px rgba(61,75,107,0.14)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
