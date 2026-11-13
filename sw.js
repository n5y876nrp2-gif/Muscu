/* Service worker de Muscu : met l'app en cache pour qu'elle marche sans réseau.
   À chaque nouvelle version, changer CACHE pour forcer le rechargement des fichiers. */
const CACHE = 'muscu-1.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './fonts/plaque-bold.woff',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  // Page : réponse immédiate depuis le cache, mise à jour en arrière-plan
  // (une nouvelle version s'affiche au lancement suivant).
  if (request.mode === 'navigate') {
    const network = fetch(request)
      .then(async response => {
        if (response && response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put('./index.html', response.clone());
        }
        return response;
      })
      .catch(() => null);
    event.waitUntil(network);
    event.respondWith((async () => {
      const cached = await caches.match('./index.html');
      if (cached) return cached;
      const response = await network;
      return response || new Response('<h1>Hors ligne</h1><p>Ouvre l’app une première fois avec du réseau.</p>', {
        status: 503,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    })());
    return;
  }

  // Police, icônes, manifeste : cache d'abord.
  event.respondWith(
    caches.match(request).then(hit => hit || fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
