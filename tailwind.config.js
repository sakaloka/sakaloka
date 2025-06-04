module.exports = {
  content: ['./src/**/*.{html,js}'],
  darkMode: 'class', // ⬅️ ini penting biar Tailwind gak ikutin setting sistem
  safelist: ['alert-success', 'alert-error', 'alert-warning', 'alert-info'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-in forwards',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // ⬅️ optional, kamu bisa pakai hanya "light" aja
  },
};
