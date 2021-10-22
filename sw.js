const CACHE = 'offline-fallback';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(networkOrCache(event.request)
        .catch(() => useFallback()));
});

function networkOrCache(request) {
    return fetch(request)
        .then((response) => response.ok ? response : fromCache(request))
        .catch(() => fromCache(request));
}

const FALLBACK =
    '<div style="margin-left:auto;margin-right:auto;">\n' +
    '    Z_phyr\'s personal page\n' +
    '    Личная страница Z_phyr\n' +
    '    Dude, you\'re offline\n' +
    '    Чувак, ты в оффлайне\n' +
    '    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none repeat scroll 0% 0%; display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g><path d="M50 8A42 42 0 1 0 92 50.00000000000001" fill="none" stroke="#6d04af" stroke-width="8"></path><path d="M49 -2L49 18L59 8L49 -2" fill="#6d04af"></path><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="4s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></g></svg>\n' +
    '</div>';

function useFallback() {
    return Promise.resolve(new Response(FALLBACK, { headers: {
        'Content-Type': 'text/html; charset=utf-8'
    }}));
}

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}
