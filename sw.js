// Serves the decrypted viewer files (put in Cache Storage by index.html) under ./v/.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||!u.pathname.startsWith(new URL('v/',registration.scope).pathname))return;
  e.respondWith(caches.match(u.origin+u.pathname).then(r=>r||Response.redirect(registration.scope,302)));
});
