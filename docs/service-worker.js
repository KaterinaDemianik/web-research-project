const CACHE_NAME = 'travel-journal-cache-v3';
const urlsToCache = ['.', 'index.html', 'manifest.json', 'assets/index-DWMSd_ij.js', 'assets/index-BjntYgTV.css'];

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
