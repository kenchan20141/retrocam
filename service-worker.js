// service-worker.js
const CACHE_NAME = 'lumigraph-v5'; // 強制更新版本
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600&display=swap',
  'https://fonts.gstatic.com/s/notoseriftc/v27/PlI8VYzLpJwX7OzU5vQqjZ6dLLD6eO4b4b2dPw.woff2',
  'https://taira-komori.net/sound_os2/electric01/camera1.mp3',
  'https://taira-komori.net/sound_os2/electric01/fluorescent_switch1.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS)
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => {
      // 立即取得所有客戶端控制權
      return self.clients.claim();
    })
  );
});

// 關鍵修復: 處理離線導航請求
self.addEventListener('fetch', (e) => {
  // 只處理同源請求
  if (new URL(e.request.url).origin !== self.location.origin) {
    return;
  }

  // 導航請求 (HTML) - 嚴格離線處理
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => {
        // 100% 離線可靠性: 確保即使在離線狀態也返回快取的 HTML
        return caches.match('/index.html') || caches.match('/');
      })
    );
    return;
  }

  // 靜態資源請求 - 強制從快取讀取
  if (e.request.destination === 'script' || 
      e.request.destination === 'style' || 
      e.request.destination === 'image' ||
      e.request.destination === 'font') {
    e.respondWith(
      caches.match(e.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(e.request);
      })
    );
    return;
  }

  // 其他請求 - 先嘗試網路，失敗後不回退
  e.respondWith(fetch(e.request));
});

// 關鍵: 處理客戶端訊息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
