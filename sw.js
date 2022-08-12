var urlsToPrefetch=["/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/browserconfig.xml","/cursor.svg","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/index.html","/main.bundle.js","/main.css","/mstile-150x150.png","/ogimg.jpg","/ogimg.webp","/safari-pinned-tab.svg","/site.webmanifest"],version="1.0.2";self.addEventListener("install",function(a){console.log("WORKER: install event in progress."),a.waitUntil(caches.open(version+"fundamentals").then(function(a){return a.addAll(urlsToPrefetch)}).then(function(){console.log("WORKER: install completed")}))}),self.addEventListener("fetch",function(a){if(console.log("WORKER: fetch event in progress."),"GET"!==a.request.method){console.log("WORKER: fetch event ignored.",a.request.method,a.request.url);return}a.respondWith(caches.match(a.request).then(function(b){var c=fetch(a.request).then(function(b){var c=b.clone();return console.log("WORKER: fetch response from network.",a.request.url),caches.open(version+"pages").then(function(b){b.put(a.request,c)}).then(function(){console.log("WORKER: fetch response stored in cache.",a.request.url)}),b},d).catch(d);return console.log("WORKER: fetch event",b?"(cached)":"(network)",a.request.url),b||c;function d(){return console.log("WORKER: fetch request failed in both cache and network."),new Response("<h1>Service Unavailable</h1>",{status:503,statusText:"Service Unavailable",headers:new Headers({"Content-Type":"text/html"})})}}))}),self.addEventListener("activate",function(a){console.log("WORKER: activate event in progress."),a.waitUntil(caches.keys().then(function(a){return Promise.all(a.filter(function(a){return!a.startsWith(version)}).map(function(a){return caches.delete(a)}))}).then(function(){console.log("WORKER: activate completed.")}))})
