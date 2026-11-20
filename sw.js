const CACHE_NAME = 'tgcf-ios-v2';
const ARCHIVOS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((respuestaLocal) => {
      // Devuelve SIEMPRE la copia guardada en el iPhone sin depender del servidor
      return respuestaLocal || fetch(e.request);
    })
  );
});