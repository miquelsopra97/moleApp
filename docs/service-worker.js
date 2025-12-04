const CACHE_NAME = 'molegame-cache-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => {
        console.warn('[SW] Error en cache.addAll:', err);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheResp => {
      return (
        cacheResp ||
        fetch(event.request).catch(() => caches.match('/index.html'))
      );
    })
  );
});
