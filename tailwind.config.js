/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        med: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          'surface-hover': '#F1F5F9',
          primary: '#0D9488',
          'primary-hover': '#0F766E',
          secondary: '#0284C7',
          accent: '#2563EB',
          text: '#0F172A',
          muted: '#475569',
          border: 'rgba(13, 148, 136, 0.2)',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    }
  },
  plugins: [],
};