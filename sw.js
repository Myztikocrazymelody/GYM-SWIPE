const C='gymswipe-v2';
const FILES=["./", "index.html", "manifest.json", "gifs/bbcurl.gif", "gifs/bench.gif", "gifs/calf.gif", "gifs/cgbench.gif", "gifs/chins.gif", "gifs/cleanpress.gif", "gifs/crunch.gif", "gifs/dbcurl.gif", "gifs/deadlift.gif", "gifs/incline.gif", "gifs/lateral.gif", "gifs/legcurl.gif", "gifs/lunge.gif", "gifs/pullover.gif", "gifs/revcrunch.gif", "gifs/revwrist.gif", "gifs/rows.gif", "gifs/sldl.gif", "gifs/squat.gif", "gifs/triext.gif", "gifs/wristcurl.gif", "thumbs/bbcurl.jpg", "thumbs/bench.jpg", "thumbs/calf.jpg", "thumbs/cgbench.jpg", "thumbs/chins.jpg", "thumbs/cleanpress.jpg", "thumbs/crunch.jpg", "thumbs/dbcurl.jpg", "thumbs/deadlift.jpg", "thumbs/incline.jpg", "thumbs/lateral.jpg", "thumbs/legcurl.jpg", "thumbs/lunge.jpg", "thumbs/pullover.jpg", "thumbs/revcrunch.jpg", "thumbs/revwrist.jpg", "thumbs/rows.jpg", "thumbs/sldl.jpg", "thumbs/squat.jpg", "thumbs/triext.jpg", "thumbs/wristcurl.jpg", "icons/apple-touch-icon.png", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('.html'))){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&(u.origin===location.origin||u.host.includes('fonts.g'))){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res})));
});
