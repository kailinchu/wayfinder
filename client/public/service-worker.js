self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    ))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});
