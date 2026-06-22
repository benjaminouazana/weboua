import type { Config } from 'tailwindcss';

/**
 * Weboua design system.
 * Brand: dark forest green + vibrant mint accent (from the logo arrow).
 * Tone: confident, premium, conversion-focused.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep greens
        forest: {
          DEFAULT: '#0C3A2E',
          50: '#EEF6F2',
          100: '#D7EAE2',
          900: '#072820',
        },
        pine: '#15614E',
        emerald: {
          DEFAULT: '#1F8A6B',
          dark: '#177057',
        },
        // Accent — the logo arrow
        mint: {
          DEFAULT: '#58C28E',
          light: '#86D9AF',
        },
        // Neutrals
        ink: '#0F1B18',
        muted: '#5B6B66',
        cream: '#F6FAF8',
        line: '#E4ECE8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(12, 58, 46, 0.04), 0 8px 24px rgba(12, 58, 46, 0.06)',
        lift: '0 8px 40px rgba(12, 58, 46, 0.12)',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
