// service-worker.js

const CACHE_NAME = 'lumigraph-v2'; // ⚠️ 更改版本号强制更新
const urlsToCache = [
  './',
  './manifest.json',
  './icon-512.png',
  './icon-192.png', // 建议加上 192px icon
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).then(() => self.skipWaiting());
    })
  );
});

// 激活时删除旧缓存
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

// 策略：HTML 用 network-first（保证最新），其他用 cache-first
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // 只处理同源请求
  if (url.origin !== self.location.origin) {
    return;
  }

  // 如果是 HTML 文档（导航请求）
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => {
        // 网络失败 → 回退到缓存的 HTML（离线兜底）
        return caches.match('./');
      })
    );
    return;
  }

  // 其他资源（图片、JSON 等）用缓存优先
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
