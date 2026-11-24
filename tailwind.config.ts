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
        // Raw materials: poured concrete, mild steel, drafting paper, brand brass.
        ink: '#121211',
        concrete: {
          950: '#0e0e0d',
          900: '#171716',
          800: '#21211f',
          700: '#2e2d2a',
          600: '#4a4844',
          500: '#6f6c66',
          400: '#9a968e',
          300: '#bdb8ae',
        },
        paper: {
          DEFAULT: '#ebe7dd',
          50: '#f5f2ea',
          200: '#dfd9cc',
          300: '#cfc8b8',
        },
        steel: '#8c9196',
        gold: {
          DEFAULT: '#f2c230',
          light: '#f7d462',
          dark: '#a87d0a',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#eeeeee',
          200: '#d9d9d9',
          300: '#bfbfbf',
          400: '#8f8f8f',
          500: '#6b6b6b',
          600: '#4a4a4a',
          700: '#3d3d3d',
          800: '#2d2d2d',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
