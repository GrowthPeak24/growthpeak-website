/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#37ca37',
          blue: '#188bf6',
          cyan: '#00d4ff',
          navy: '#0b2545',
          light: '#f8fafc',
          footer: '#050e1f',
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
        'brand-gradient': 'linear-gradient(135deg, #188bf6 0%, #00d4ff 100%)',
        'hero-gradient':
          'linear-gradient(135deg, #0b2545 0%, #123a63 55%, #0b2545 100%)',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(11, 37, 69, 0.18)',
        'card-hover': '0 22px 45px -16px rgba(11, 37, 69, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
