const CACHE_VERSION = 'v3';
const CACHE_NAME = `sillans-${CACHE_VERSION}`;
const RUNTIME_CACHE = `sillans-runtime-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './onboarding.html',
  './accueil.html',
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
  './js/rollier.js',
  './js/carte.js',
  './js/capsule.js',
  './js/quiz.js',
  './data/content.js',
  './assets/icons/logo-sillans.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.warn('[SW] skip cache:', url, err.message))
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(k => k !== CACHE_NAME && k !== RUNTIME_CACHE)
        .map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isFontHost = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';

  if (!isSameOrigin && !isFontHost) return;

  if (req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then(c => c || caches.match('./accueil.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) {
        if (isFontHost || req.destination === 'image') {
          fetch(req).then(res => {
            if (res && res.status === 200) {
              caches.open(RUNTIME_CACHE).then(c => c.put(req, res.clone()));
            }
          }).catch(() => {});
        }
        return cached;
      }
      return fetch(req).then(res => {
        if (!res || res.status !== 200) return res;
        const targetCache = isFontHost || req.destination === 'image' ? RUNTIME_CACHE : CACHE_NAME;
        const clone = res.clone();
        caches.open(targetCache).then(c => c.put(req, clone));
        return res;
      }).catch(() => {
        if (req.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#152848"/></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
        return new Response('', { status: 504 });
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
