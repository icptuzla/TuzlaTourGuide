const SW_VERSION = 'v2026-04-30-1';
const CACHE_APP = `tuzla-app-${SW_VERSION}`;
const CACHE_RUNTIME = `tuzla-runtime-${SW_VERSION}`;
const CACHE_TILES = `tuzla-map-tiles-${SW_VERSION}`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/Gallery/QuestQRLocations/nobckgsalineslogo.png',
  '/assets/Gallery/tuzlaline23.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_APP);
      await cache.addAll(APP_SHELL);
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => ![CACHE_APP, CACHE_RUNTIME, CACHE_TILES].includes(name))
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

const isTileRequest = (requestUrl) =>
  requestUrl.includes('tile.openstreetmap.org') ||
  requestUrl.includes('api.jawg.io') ||
  requestUrl.includes('maptiler') ||
  requestUrl.includes('mapbox');

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE_APP);
          cache.put('/index.html', fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match('/index.html');
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  if (isTileRequest(url.href)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_TILES);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh.ok) cache.put(request, fresh.clone());
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_RUNTIME);
      const cached = await cache.match(request);

      if (cached) {
        fetch(request)
          .then((fresh) => {
            if (fresh.ok) cache.put(request, fresh.clone());
          })
          .catch(() => {});
        return cached;
      }

      try {
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      } catch {
        const appCached = await caches.match(request);
        return appCached || Response.error();
      }
    })()
  );
});
