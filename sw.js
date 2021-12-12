;
//asignar un nombre y versión al cache
const CACHE_NAME = 'cache_electronicos',
  urlsToCache = [
    'index.html',
    'cart_items.html',
    'style.css',
<<<<<<< HEAD
    
    'main.js',
    'script.js',
    'manifest.json',

    'https://unpkg.com/dexie@latest/dist/dexie.js',

    'cart.js',
    'cartUI.js',
    'connection.js',
    'products.js',

    './img/icon-192x192.png',
    'DSLR Camera - 800x800.png',
    'Experia Tablet - 900x610.png',
    'img_561232.png',
    'Mac Book - 900x709.png',
    'Refrigerator - 800x800.png',
=======
    'sw.js',
    '/js/main.js',
    './script.js',
    'manifest.json',
    'https://unpkg.com/dexie@latest/dist/dexie.js',
    '/js/cart.js',
    '/js/cartUI.js',
    '/js/connection.js',
    '/js/products.js',
    './img/icon-192x192.png',
    '/assets/DSLR Camera - 800x800.png',
    '/assets/Experia Tablet - 900x610.png',
    '/assets/img_561232.png',
    '/assets/Mac Book - 900x709.png',
    '/assets/Refrigerator - 800x800.png',
>>>>>>> 66e3a675affa7924e141bc714c60d4df7f1743d4
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js.map'
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
