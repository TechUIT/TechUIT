


// Nombre de la caché (versión 1)
const CACHE_NAME = 'techuit-cache-v1';

// Lista de archivos esenciales para que la app funcione sin conexión
const urlsToCache = [
    '/',
    'index.html',
    'formulario-clientes.html',
    'formulario-tecnicos.html',
    'confirmacion-pago.html',
    // IMPORTANTE: Asegúrate de que el nombre del logo coincida exactamente con tu manifest
    'Logo.png' 
];

// Instalación del Service Worker (cachea los archivos iniciales)
self.addEventListener('install', event => {
    // Forzar la activación inmediatamente para que la PWA esté lista
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cacheando shell de la aplicación');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación del Service Worker (limpia cachés viejas)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Estrategia de Fetch (Prioriza la caché para rapidez offline)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si encontramos algo en la caché, lo devolvemos
                if (response) {
                    return response;
                }
                
                // Si no, vamos a la red
                return fetch(event.request);
            })
    );
});
