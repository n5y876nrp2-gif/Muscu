/* Service worker de Muscu : met l'app et les photos en cache pour qu'elles marchent sans réseau.
   À chaque nouvelle version de l'app, changer CACHE pour forcer le rechargement des fichiers.
   Les photos ont leur propre cache, conservé d'une version à l'autre. */
const CACHE = 'muscu-1.1';
const PHOTO_CACHE = 'muscu-photos-1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './plaque-bold.woff',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];
const PHOTO_HOSTS = ['cdn.jsdelivr.net', 'raw.githubusercontent.com'];

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
      .then(keys => Promise.all(keys.filter(key => key !== CACHE && key !== PHOTO_CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Photos : cache d'abord ; une seule requête réseau à la fois par photo.
const inflight = new Map();
async function photo(url) {
  const cache = await caches.open(PHOTO_CACHE);
  const hit = await cache.match(url);
  if (hit) return hit;
  if (!inflight.has(url)) {
    inflight.set(url, fetch(url, { mode: 'cors', credentials: 'omit' })
      .then(async response => {
        if (response.ok) await cache.put(url, response.clone());
        return response;
      })
      .finally(() => inflight.delete(url)));
  }
  const response = await inflight.get(url);
  return response.clone();
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (PHOTO_HOSTS.includes(url.hostname) && url.pathname.includes('/free-exercise-db')) {
    event.respondWith(photo(request.url));
    return;
  }
  if (url.origin !== self.location.origin) return;

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
