// Serves the decrypted viewer files (put in Cache Storage by index.html) under ./v/.
// Opening or reloading the viewer first checks for a newer build; if there is one, index.html fetches it.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url), scope=registration.scope;
  if(u.origin!==location.origin||!u.pathname.startsWith(new URL('v/',scope).pathname))return;
  e.respondWith((async()=>{
    if(e.request.mode==='navigate')try{
      const m=(await(await fetch(scope,{cache:'no-store'})).text()).match(/m-[0-9a-f]+\.bin/)?.[0], c=await caches.match(new URL('v/.manifest',scope).href);
      if(m&&(!c||await c.text()!==m))return Response.redirect(scope,302);
    }catch{}   // offline: show what is cached
    return (await caches.match(u.origin+u.pathname))||Response.redirect(scope,302);
  })());
});
