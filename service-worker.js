// service-worker.js
const CACHE_NAME = 'lumigraph-v1';
const urlsToCache = [
  './',                     // 主頁（你的 HTML）
  './manifest.json',       // PWA 設定
  './icon-512.png',        // App icon
  // 注意：所有資源都內嵌，所以只需快取 HTML 就夠了！
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
