// Registra el service worker para que la app se pueda instalar
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service worker registrado con éxito:', reg);
      })
      .catch(err => {
        console.log('Fallo al registrar el service worker:', err);
      });
  });
}