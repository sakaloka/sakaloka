import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  root: 'src',        
  publicDir: 'public',

  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',           
      filename: 'sw.js',     
      injectManifest: {
        swSrc: 'src/sw.js',   
      },

      registerType: 'autoUpdate',
      manifest: {
        name: 'Sakaloka App',
        short_name: 'Sakaloka',
        description:
          "SakaLoka adalah platform peta pintar berbasis AI yang menghadirkan rekomendasi acara budaya dan destinasi wisata lokal di Indonesia secara personal dan interaktif.",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#483434',
        icons: [
          {
            src: '/images/icons/icon-x144.png',
            type: 'image/png',
            sizes: '144x144',
            purpose: 'any',
          },
          {
            src: '/images/icons/maskable-icon-x44.png',
            type: 'image/png',
            sizes: '48x48',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/maskable-icon-x96.png',
            type: 'image/png',
            sizes: '96x96',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/maskable-icon-x192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/maskable-icon-x384.png',
            type: 'image/png',
            sizes: '384x384',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/maskable-icon-x512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'images/screenshots/desktop-1.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'images/screenshots/desktop-2.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'images/screenshots/desktop-3.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'images/screenshots/mobile-1.jpg',
            sizes: '1080x2280',
            type: 'image/jpg',
            form_factor: 'narrow',
          },
          {
            src: 'images/screenshots/mobile-2.jpg',
            sizes: '1080x2280',
            type: 'image/jpg',
            form_factor: 'narrow',
          },
        ],
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        '/images/*',
        '/images/icons/*',
        '/images/screenshots/*',
      ],
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],

  build: {
    manifest: true,
    outDir: '../dist',   
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
