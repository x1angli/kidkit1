const CACHE='kidkit1-v9';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('kidkit1-')||key.startsWith('little-addition-'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request;
  const url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // Prefer fresh files online; retain the complete app for offline use.
    try{
      const response=await fetch(request);
      if(response.ok){await cache.put(request,response.clone());if(request.mode==='navigate')await cache.put('./index.html',response.clone());}
      return response;
    }catch(error){
      return (await cache.match(request))||(request.mode==='navigate'?await cache.match('./index.html'):null)||Response.error();
    }
  })());
});
