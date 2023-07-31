'use strict';
const CACHE_STATIC = 'zphyr-v1';
function hndlEventInstall(evt) {
    async function cacheStaticFiles() {
        const files = [
            './'
        ];
        const cacheStat = await caches.open(CACHE_STATIC);
        await Promise.all(
            files.map(function (url) {
                return cacheStat.add(url).catch(function (reason) {
                    console.log(`'${url}' failed: ${String(reason)}`);
                });
            })
        );
    }
    evt.waitUntil(cacheStaticFiles());
}
function hndlEventFetch(evt) {
    async function getFromCache() {
        const cache = await self.caches.open(CACHE_STATIC);
        const cachedResponse = await cache.match(evt.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        const resp = await fetch(evt.request);
        await cache.put(evt.request, resp.clone());
        return resp;
    }
    evt.respondWith(getFromCache());
}
self.addEventListener('install', hndlEventInstall);
self.addEventListener('fetch', hndlEventFetch);
