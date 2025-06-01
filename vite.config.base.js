import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default {
  root: 'src',
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [tailwindcss()],
};