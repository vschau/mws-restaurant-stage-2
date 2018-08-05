"use strict";

const staticCacheName = 'restaurant-static-v2';
const urlsToCache = [
  '/',
  '/restaurant.html',
  '/js/main.bundle.js',
  '/js/commons.bundle.js',
  '/js/restaurant.bundle.js',
  '/css/bundle.css',
  '/manifest.json',
  '/favicon.ico',
  '/img/1_800.jpg',
  '/img/2_800.jpg',
  '/img/3_800.jpg',
  '/img/4_800.jpg',
  '/img/5_800.jpg',
  '/img/6_800.jpg',
  '/img/7_800.jpg',
  '/img/8_800.jpg',
  '/img/9_800.jpg',
  '/img/10_800.jpg',
  '/img/undefined_800.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
  'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
  'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  let requestUrl = new URL(event.request.url);

  let cacheRequest = new Request(event.request.url, { mode: 'no-cors' });

  // serve images from cache.  If not available, fetch and insert into cache
  if (requestUrl.pathname.startsWith('/img/') || requestUrl.hostname.indexOf('mapbox.com') > -1) {
    event.respondWith(servePhoto(cacheRequest));
    return;
  }

  if (requestUrl.pathname.startsWith('/restaurant.html')) {
    cacheRequest = new Request('restaurant.html');
  }

  event.respondWith(
    caches.match(cacheRequest, { ignoreSearch: true }).then(response => {
      if (response) return response;
      return fetch(cacheRequest);
    })
  );
});

// Helper functions
function servePhoto(request) {
  let url = request.url.replace(/_400/, '_800');

  return caches.open(staticCacheName).then(cache => {
    return cache.match(url).then(response => {
      if (response) return response;

      return fetch(request).then(networkResponse => {
        cache.put(url, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}