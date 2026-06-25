const CACHE = 'fm-selector-v6';
const ASSETS = ['./','./index.html','./crosswalk.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon-180.png'];
self.addEventListener('install',(e)=>{e.waitUntil(caches.open(CACHE).then((c)=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',(e)=>{e.waitUntil(caches.keys().then((ks)=>Promise.all(ks.filter((k)=>k!==CACHE).map((k)=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',(e)=>{const r=e.request;if(r.method!=='GET')return;e.respondWith(caches.match(r).then((h)=>h||fetch(r).then((res)=>{try{const c=res.clone();caches.open(CACHE).then((ca)=>ca.put(r,c));}catch(_){}return res;}).catch(()=>{if(r.mode==='navigate')return caches.match('./index.html');})));});
