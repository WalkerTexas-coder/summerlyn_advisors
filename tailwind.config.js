/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#0b0b10', 900: '#111118', 800: '#1a1a24', 700: '#262633', 600: '#3a3a4a' },
        brand: { 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6' },
        cyan: { 300: '#67e8f9', 400: '#22d3ee' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'none' } },
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(30px,-20px) scale(1.08)' } },
      },
      animation: { fadeUp: 'fadeUp .7s ease-out both', drift: 'drift 14s ease-in-out infinite' },
    },
  },
  plugins: [],
};
