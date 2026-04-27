const CACHE_NAME = 'tuzla-cache-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/Gallery/Photos/tz_compressed.mp4',
    '/assets/HistoryEN.webp',
    '/assets/HistoryEN2.webp',
    '/assets/HistoryBA.webp',
    '/assets/HistoryBA2.webp',
    '/assets/HistoryTR.webp',
    '/assets/HistoryTR2.webp',
    '/assets/HistoryDE.webp',
    '/assets/HistoryDE2.webp',
    '/assets/Pannonica.webp',
    '/assets/PannonicaTR.webp',
    '/assets/PannonicaDE.webp',
    '/assets/PannonicaBA.webp',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        )
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
