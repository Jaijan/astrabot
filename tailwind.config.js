/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#03040a',
          900: '#070912',
          800: '#0e1425',
          700: '#17203a'
        },
        glow: '#5ddcff'
      },
      boxShadow: {
        halo: '0 0 60px rgba(93,220,255,0.2)'
      }
    }
  },
  plugins: []
};
