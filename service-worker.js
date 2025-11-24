// service-worker.js
const CACHE_NAME = 'lumigraph-v7'; // ★ 關鍵：改成 v6，強制新快取！舊 v5 會被刪除
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
        .then(() => self.skipWaiting()); // ★ 強化：立即激活新 SW，跳過等待
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name)) // ★ 刪除所有舊快取（包括 v5）
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

  // 處理導航請求 (HTML頁面)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      // 嘗試從網路獲取（優先新版本）
      fetch(e.request)
        .catch(() => {
          // 網路失敗，從快取獲取
          return caches.match('/index.html') || caches.match('/');
        })
        .catch(() => {
          // 所有方法都失敗，返回一個基本的離線頁面
          return new Response('<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please go back and try again when online.</p></body></html>', {
            headers: { 'Content-Type': 'text/html' }
          });
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

// 關鍵: 處理客戶端訊息（強化更新觸發）
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting(); // 立即激活
  } else if (event.data && event.data.type === 'FORCE_UPDATE') {
    // ★ 新增：客戶端可強制 SW 更新
    self.registration.update();
  }
});
