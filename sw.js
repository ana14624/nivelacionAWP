;
//asignar un nombre y versión al cache
const CACHE_NAME = 'cache_electronicos',
  urlsToCache = [
    './',
    'index.html',
    'cart_items.html',
    'style.css',
    './script.js',
    'manifest.json',
    'https://unpkg.com/dexie@latest/dist/dexie.js',
    "/js/main.js",
    './img/icon-192x192.png'
    ]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        await cache.addAll(urlsToCache)
          return self.skipWaiting()
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }
        return fetch(e.request)
      })
  )
})
