const CACHE = 'coracia-v1';

const PRECACHE = [
  './',
  './index.html',
  './onboarding.html',
  './accueil.html',
  './parcours.html',
  './carte.html',
  './capsule.html',
  './quiz.html',
  './apres-visite.html',
  './manifest.json',
  './css/base.css',
  './css/components.css',
  './css/animations.css',
  './js/state.js',
  './js/navigation.js',
  './js/carte.js',
  './js/capsule.js',
  './js/quiz.js',
  './js/ambiance.js',
  './js/pwa.js',
  './data/content.js',
  './assets/icons/logo-sillans.svg',
  './assets/icons/logo-sillans-ecrit.svg',
  './assets/icons/Coracia%20fatigu%C3%A9.svg',
  './assets/icons/Coracia%201%20sur%204.svg',
  './assets/icons/Coracia%202%20sur%204.svg',
  './assets/icons/Coracia%203%20sur%204.svg',
  './assets/images/EGLISE.jpg',
  './assets/images/CASCADE.jpg',
  './assets/images/11197312(43).JPG',
  './assets/images/11197312(48).JPG',
  './assets/images/11197312(51).JPG',
  './assets/images/11197312(61).JPG',
  './assets/images/11197312(35).JPG',
  './assets/images/FloranDERACHE_RG_camera_cascadezoom2.jpg',
  './assets/images/logo%20fini3.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(PRECACHE.map(url => cache.add(url).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Tuiles carte : network-first, mise en cache dynamique pour usage offline
  if (url.includes('maptiler') || (url.includes('/tiles/') && url.includes('tile'))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Tout le reste : cache-first, réseau en fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./accueil.html');
        }
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
