import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#f6f6f6',
          100: '#eeeeee',
          200: '#d9d9d9',
          300: '#bfbfbf',
          400: '#8f8f8f',
          500: '#6b6b6b',
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#3d3d3d',
          600: '#4a4a4a',
        },
        gold: {
          DEFAULT: '#f4c542',
          light: '#f8d35f',
          dark: '#d3a52f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        lift: '0 18px 50px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
