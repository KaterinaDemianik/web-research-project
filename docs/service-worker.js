const CACHE_NAME = 'travel-journal-cache-v2';
const urlsToCache = ['.', 'index.html', 'manifest.json', 'assets/index-CGPZEyo2.js', 'assets/index-YXVK3xY1.css'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
