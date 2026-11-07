// Retired legacy service worker.
// The original static site registered a cache-first worker for /index.html,
// /script.js and /style.css. Next.js serves different assets, so this worker
// clears those stale caches and removes itself.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();
    })()
  );
});
