/** A complete build is cached atomically before activation. Previous assets stay
 * available until every live window confirms it loaded this worker's build. */
export function renderOfflineWorker(
	version: string,
	assets: string[],
	buildId = version,
) {
	return `
const PREFIX='elecalculate-static-';
const CACHE=PREFIX+${JSON.stringify(version)};
const BUILD=${JSON.stringify(buildId)};
const ASSETS=${JSON.stringify(assets)};
const confirmedClients=new Set();
async function pruneUnusedCaches(){
 // Do not delete the cache a different worker is currently installing.
 if(self.registration.installing||self.registration.waiting)return;
 const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
 const ids=new Set(windows.map(client=>client.id));
 for(const id of confirmedClients)if(!ids.has(id))confirmedClients.delete(id);
 const unknown=windows.filter(client=>!confirmedClients.has(client.id));
 for(const client of unknown)client.postMessage({type:'ELECALCULATE_BUILD_REQUEST'});
 if(unknown.length)return;
 for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);
}
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('message',event=>{
 if(event.data?.type==='ELECALCULATE_ACTIVATE_UPDATE')event.waitUntil(self.skipWaiting());
 if(event.data?.type==='ELECALCULATE_CLIENT_READY'&&event.source?.id&&event.data.build===BUILD){
  confirmedClients.add(event.source.id);
  event.waitUntil(pruneUnusedCaches());
 }
});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 await self.clients.claim();
 await pruneUnusedCaches();
})()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate')event.waitUntil(pruneUnusedCaches());
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(event.request.mode==='navigate'){
   let path;try{const parts=decodeURIComponent(url.pathname).split('/').filter(Boolean);path='/'+parts.join('/')+(url.pathname.endsWith('/')&&parts.length?'/':'');}catch{return new Response('Bad request',{status:400});}
   const candidates=[path,path.endsWith('/')?path+'index.html':path+'/index.html'];
   if(path==='/')candidates.push('/index.html');
   for(const candidate of candidates){const cached=await cache.match(candidate);if(cached)return cached;}
   try{return await fetch(event.request);}catch{
    const fallback=await cache.match('/404.html');
    return new Response(fallback?await fallback.text():'Seite nicht gefunden',{status:404,headers:{'Content-Type':'text/html; charset=utf-8'}});
   }
  }
  const hit=await cache.match(event.request,{ignoreSearch:true});if(hit)return hit;
  // A different tab can still need chunks from the generation it loaded.
  if(url.pathname.startsWith('/assets/')){
   for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE){const old=await(await caches.open(key)).match(event.request,{ignoreSearch:true});if(old)return old;}
  }
  return fetch(event.request);
 })());
});
`;
}
