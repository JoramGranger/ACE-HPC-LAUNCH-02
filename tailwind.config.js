/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#0A0A0A',
        'ace-red': '#FF0000',
      },
      minHeight: {
        screen: '100vh',
      },
      minWidth: {
        screen: '1920px',
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow-green': '0 0 10px #22c55e, 0 0 20px #22c55e',
        'glow-amber': '0 0 10px #f59e0b, 0 0 20px #f59e0b',
      },
      zIndex: {
        '9999': '9999',
      },
    },
  },
  plugins: [],
};
