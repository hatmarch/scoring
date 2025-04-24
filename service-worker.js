// Hearts Score Tracker Service Worker
const CACHE_NAME = "hearts-score-tracker-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/manifest.json",
  "/images/hearts-icon.svg",
  "/images/hearts-icon-152.png",
  "/images/hearts-icon-167.png",
  "/images/hearts-icon-180.png",
  "/images/hearts-icon-192.png",
  "/images/hearts-icon-512.png",
  "/images/splash-640x1136.png",
  "/images/splash-750x1334.png",
  "/images/splash-828x1792.png",
  "/images/splash-1125x2436.png",
  "/images/splash-1242x2688.png",
  "/images/splash-1536x2048.png",
  "/images/splash-1668x2224.png",
  "/images/splash-1668x2388.png",
  "/images/splash-2048x2732.png",
];

// Install event - cache all necessary assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Clone the request because it's a one-time use
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response because it's a one-time use
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          // When offline and resource isn't in cache, try to serve index.html for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }

          // Log the error for debugging purposes
          console.error("Fetch failed:", error);

          // Create a simple fallback response for network errors
          return new Response("Network error happened", {
            status: 408,
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        });
    })
  );
});
