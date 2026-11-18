const C="ouvirpdf-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","piper-bundle.js","manifest.webmanifest","icon-192.png","icon-512.png"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{
    if((r.ok||r.type==="opaque")&&/^https?:/.test(e.request.url)&&!/huggingface/.test(e.request.url)){const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl))}
    return r;
  }).catch(()=>caches.match(e.request)));
});
