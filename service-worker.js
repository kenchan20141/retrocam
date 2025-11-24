// service-worker.js
const CACHE_NAME = 'lumigraph-v4'; // 更改版本號強制更新
const urlsToCache = [
  'index.html',
  './manifest.json',
  './icon-512.png',
  './icon-192.png',
  // 添加關鍵資源
  'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600&display=swap',
  'https://taira-komori.net/sound_os2/electric01/camera1.mp3',
  'https://taira-komori.net/sound_os2/electric01/fluorescent_switch1.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
        .then(() => self.skipWaiting())
        .catch(err => console.log('Cache failed:', err));
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

// 定義緩存策略
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // 導航請求：network-first + offline fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('index.html'))
    );
    return;
  }

  // 動態媒體資源 (相機相關) 不要緩存
  if (url.pathname.includes('/media/') || url.pathname.includes('blob:')) {
    return;
  }

  // 其他靜態資源採用 cache-first 策略
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then(networkResponse => {
        // 只緩存成功的響應
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // 完全離線且沒有緩存的情況下，返回合適的默認內容
        if (e.request.url.endsWith('.js') || e.request.url.endsWith('.css')) {
          return new Response('// Empty fallback', { headers: { 'Content-Type': 'application/javascript' } });
        }
        return caches.match('index.html');
      });
    })
  );
});
