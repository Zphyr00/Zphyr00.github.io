navigator.userAgent.match(/(ipad|iphone|ipod)/i)&&!window.MSStream&&(document.documentElement.className+=" ios")"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").then(function(a){console.log("ServiceWorker registration successful")},function(a){console.log("ServiceWorker registration failed: ",a)})})
