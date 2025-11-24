// service-worker.js
const CACHE_NAME = 'lumigraph-v2'; // ⚠️ 更改版本号强制更新
const urlsToCache = [
  'index.html',           // ✅ 明確指定 HTML
  './manifest.json',
  './icon-512.png',
  './icon-192.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // 導航請求（HTML）：network-first + offline fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('index.html')) // ✅ 改為 index.html
    );
    return;
  }

  // 其他資源：cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
