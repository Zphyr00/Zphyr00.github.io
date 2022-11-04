self.addEventListener("fetch",(function(e){console.log(e.request.url)}));navigator.serviceWorker.addEventListener("controllerchange",()=>window.location.reload())
