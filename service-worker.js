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
  // 處理導航請求
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          // 只有成功獲取時才更新緩存
          if (response.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(e.request, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          // 從緩存中獲取，但添加隨機參數避免使用過期版本
          const url = new URL(e.request.url);
          url.searchParams.set('sw-bypass', Date.now());
          return caches.match(url.toString())
            .then(response => response || caches.match('/index.html'));
        })
    );
    return;
  }

  // 處理非導航請求
  e.respondWith(
    caches.match(e.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request)
          .catch(() => {
            // 如果是核心資產，即使網路失敗也嘗試從快取獲取
            if (CORE_ASSETS.includes(new URL(e.request.url).pathname)) {
              return caches.match(e.request);
            }
            throw new Error('Network and cache both failed');
          });
      })
  );
});

// 關鍵: 處理客戶端訊息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FORCE_REFRESH') {
    self.skipWaiting();
    event.ports[0].postMessage({ success: true });
  }
  // 保留現有的 SKIP_WAITING 處理
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
