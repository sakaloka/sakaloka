import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Precache all assets built by bundler (e.g., Vite or Rollup)
precacheAndRoute(self.__WB_MANIFEST);

// Google Fonts
registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({ cacheName: 'google-fonts' }),
);

// Leaflet tiles (OpenStreetMap)
registerRoute(
  ({ url }) => url.origin.includes('tile.openstreetmap.org'),
  new CacheFirst({ cacheName: 'osm-tiles' }),
);

// API Requests (JSON)
registerRoute(
  ({ request, url }) => {
    return (
      url.origin === 'https://sakaloka-backend-production.up.railway.app' &&
      request.destination !== 'image'
    );
  },
  new NetworkFirst({
    cacheName: 'api-data',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  }),
);

// API Images (destination thumbnails, etc.)
registerRoute(
  ({ request, url }) => {
    return (
      url.origin === 'https://sakaloka-backend-production.up.railway.app' &&
      request.destination === 'image'
    );
  },
  new StaleWhileRevalidate({
    cacheName: 'api-images',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  }),
);

// HTML pages (SPA navigation)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'html-pages' }),
);

// Auth pages or POST requests — no caching
registerRoute(
  ({ request, url }) =>
    request.method === 'POST' ||
    url.pathname.includes('/login') ||
    url.pathname.includes('/register'),
  new NetworkOnly(),
);

// Optional: Default offline fallback (404.html or offline.html)
setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    // return caches.match('/offline.html');
  }

  return Response.error();
});
