"use strict";

const staticCacheName = 'restaurant-static-v2';
const urlsToCache = [
  '/',
  '/restaurant.html',
  '/js/main.bundle.js',
  '/js/commons.bundle.js',
  '/js/restaurant.bundle.js',
  '/css/styles.css',
  '/img/marker-icon.png',
  '/img/marker-icon-2x.png',
  '/img/marker-shadow.png',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/img/undefined.jpg',
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

  // let cacheRequest = new Request(event.request.url, { mode: 'no-cors' });
  let cacheRequest = new Request(event.request.url);

  // serve images from cache.  If not available, fetch and insert into cache
  if (requestUrl.hostname.indexOf('mapbox.com') > -1) {
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
  let url = request.url;

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