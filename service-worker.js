const CACHE = 'coracia-v2';

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

// Tuiles Maptiler pour la zone de Sillans-la-Cascade (offline map)
const TILE_BASE = 'https://api.maptiler.com/maps/streets-v2';
const TILE_KEY  = 'j5GTbvHC4ExI3Tj8orVK';
const TILE_BBOX = { minLat: 43.558, maxLat: 43.572, minLng: 6.175, maxLng: 6.190 };
const TILE_ZOOMS = [13, 14, 15, 16, 17];

function latLngToTile(lat, lng, z) {
  const n = Math.pow(2, z);
  const x = Math.floor((lng + 180) / 360 * n);
  const r = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n);
  return { x, y };
}

function generateTileUrls() {
  const urls = [];
  for (const z of TILE_ZOOMS) {
    const { x: x0, y: y0 } = latLngToTile(TILE_BBOX.maxLat, TILE_BBOX.minLng, z);
    const { x: x1, y: y1 } = latLngToTile(TILE_BBOX.minLat, TILE_BBOX.maxLng, z);
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        urls.push(`${TILE_BASE}/${z}/${x}/${y}.png?key=${TILE_KEY}`);
      }
    }
  }
  return urls;
}

const BC = new BroadcastChannel('coracia-sw');

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const all   = [...PRECACHE, ...generateTileUrls()];
    let done = 0;
    await Promise.allSettled(all.map(async url => {
      try { await cache.add(url); } catch {}
      done++;
      if (done % 5 === 0 || done === all.length) {
        BC.postMessage({ type: 'CACHE_PROGRESS', value: Math.round(done / all.length * 100) });
      }
    }));
    await self.skipWaiting();
  })());
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
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  }
});
