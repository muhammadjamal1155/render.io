export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0d0d0f',
          secondary: '#141416',
          tertiary: '#1c1c1f',
        },
        accent: {
          cyan: '#00e5ff',
          amber: '#ffb300',
          red: '#ff4444',
          green: '#00c853',
        },
        border: {
          subtle: '#2a2a2e',
          bright: '#3a3a3f',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      animation: {
        'render-flash': 'renderFlash 300ms ease-out',
        'slide-in': 'slideIn 150ms ease-out',
        'fade-in': 'fadeIn 200ms ease-out',
      },
      keyframes: {
        renderFlash: {
          '0%': { boxShadow: '0 0 0px #00e5ff' },
          '50%': { boxShadow: '0 0 14px #00e5ff' },
          '100%': { boxShadow: '0 0 0px #00e5ff' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateY(-4px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #2a2a2e 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [],
}
