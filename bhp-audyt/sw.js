// Dawna wersja aplikacji BHP Audyt nie jest już publikowana pod tym adresem.
// Ten service worker usuwa zapisaną kopię aplikacji z urządzeń, które ją wcześniej otworzyły.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map(n => caches.delete(n)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({type: 'window'});
    clients.forEach(c => { try { c.navigate(c.url); } catch (e) {} });
  })());
});
