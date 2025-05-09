const CACHE_NAME = 'v1';
const OFFLINE_URL = '/offline.html';


self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        OFFLINE_URL,
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  clients.claim(); 
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});
