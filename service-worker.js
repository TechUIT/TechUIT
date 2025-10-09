// Nombre de la caché (versión 3 - Aumenté la versión para forzar la actualización)
const CACHE_NAME = 'techuit-cache-v3'; 

// IMPORTANTE: Definir la ruta base del repositorio para que funcione correctamente en GitHub Pages.
// Debe ser el nombre exacto de tu repositorio.
const REPO_BASE = '/TechUIT/'; 

// Lista de ARCHIVOS ESENCIALES que deben cachearse
const urlsToCache = [
    // El punto de inicio DEBE ser la ruta base del repositorio: /TechUIT/
    REPO_BASE, 
    // Todos los demás archivos deben ser rutas relativas o simples si están en la raíz del repo
    'index.html',
    'manifest.json', 
    'service-worker.js', 
    'formulario-clientes.html',
    'formulario-tecnicos.html',
    'confirmacion-pago.html',
    'Logo.png' 
];

// Instalación del Service Worker (cachea los archivos iniciales)
self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cacheando shell de la aplicación');
                // Esto intentará cachear todos los archivos con las rutas definidas.
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: FALLO CRÍTICO al cachear archivos. Revise la lista de URLs.', error);
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
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
