/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Surfaces, darkest -> lightest
          abyss: '#020B1A', // deepest ground: footer, page base
          navy: '#0B132B', // primary section background
          deep: '#0A2540', // raised card / panel surface
          // Accents
          blue: '#0077B6', // tech blue: gradient start, secondary accent
          cyan: '#00D2FF', // electric cyan: primary accent, focus rings
          glow: '#00E5FF', // brightest cyan: glows, gradient end, highlights
          green: '#37ca37', // affirmative checkmarks only
          light: '#f8fafc', // primary text on dark surfaces
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Lato', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ui: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1200px',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0077B6 0%, #00E5FF 100%)',
        'hero-gradient':
          'linear-gradient(135deg, #020B1A 0%, #0A2540 55%, #0B132B 100%)',
        'grid-fade':
          'radial-gradient(ellipse 60% 50% at 50% 0%, #000 60%, transparent 100%)',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(2, 11, 26, 0.6)',
        'card-hover': '0 22px 45px -16px rgba(0, 210, 255, 0.25)',
        glow: '0 0 0 1px rgba(0, 210, 255, 0.25), 0 0 32px -8px rgba(0, 229, 255, 0.45)',
        'glow-lg':
          '0 0 0 1px rgba(0, 210, 255, 0.4), 0 0 64px -12px rgba(0, 229, 255, 0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          // -50% is exact because the track holds two identical halves, each
          // carrying its own trailing gap as padding.
          to: { transform: 'translateX(-50%)' },
        },
        'beam-fall': {
          '0%': { transform: 'translateY(-30vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'beam-fall': 'beam-fall 8s linear infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
