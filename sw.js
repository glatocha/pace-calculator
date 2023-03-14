const staticCacheName = "site-static-v3";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/pwa.js",
  "/css/base.css",
  "/css/main.css",
  "/css/lcdbold.woff",
  "/assets/favicon.ico",
  "/assets/favicon.png",
  "/assets/favicon_144.png",
  "/assets/favicon_192.png",
  "/assets/favicon_512.png",
];

// install event
self.addEventListener("install", (e) => {
  //   console.log("Service worker installed");
  e.waitUntil(
    //do not finish the event until the caching is done
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (e) => {
  //   console.log("Service worker activated");
  //delete all old caches if the name does not equal to actual cache name
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== staticCacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// fetch request
self.addEventListener("fetch", (e) => {
  //   console.log("Fetch event", e);
  //respondWith is intercepting the fetch and allows to respond from cache
  //if request is found in the cache, then return this cached request
  // if not found (cacheRes is null), then fetch the request from server and return
  e.respondWith(
    caches
      .match(e.request, { ignoreVary: true })
      .then((cacheRes) => {
        if (!cacheRes) {
          console.log("Missing cache for ", e.request, cacheRes);
        }
        return cacheRes || fetch(e.request);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      })
  );
});
