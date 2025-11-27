const CACHE_NAME = 'techuit-v10';

const urlsToCache = [
  '/TechUIT/',
  '/TechUIT/index.html',
  '/TechUIT/manifest.json',
  '/TechUIT/service-worker.js',
  '/TechUIT/Logo.png',
  '/TechUIT/Logo-192.png',
  '/TechUIT/Logo-512.png',
  '/TechUIT/formulario-clientes.html',
  '/TechUIT/formulario-tecnicos.html',
  '/TechUIT/terminos-clientes.html',
  '/TechUIT/seguimiento.html',
  '/TechUIT/panel_tecnico.html'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});