const CACHE_NAME = 'Resume-v1'; //increment this when updating website
const urlsToCache = [
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  'css/animate.css',
  'css/dark.css',
  'css/glitche-basic.css',
  'css/glitche-layout.css',
  'css/green.css',
  'css/ionicons.css',
  'css/magnific-popup.css',
  'fonts/ionicons790f.eot',
  'fonts/ionicons790f.svg',
  'fonts/ionicons790f.ttf',
  'fonts/ionicons790f.woff',
  'images/subho57.jpg',
  'images/subho57_new.jpeg',
  'images/subho57_new.jpg',
  'images/activity/blogger.png',
  'images/activity/cc.png',
'images/activity/hackerrank.png',
'images/activity/hackthebox.png',
'images/activity/udemy.png',
'images/favicons/favicon.ico',
'images/favicons/favicon.png',
'images/projects/content.jpg',
'images/projects/content_finder.jpg',
'images/projects/ems.jpg',
'images/projects/ems_cover.jpg',
'js/glitche-scripts.js',
'js/imagesloaded.pkgd.js',
'js/isotope.pkgd.js',
'js/jquery.min.js',
'js/jquery.validate.js',
'js/magnific-popup.js',
'js/typed.js',
'terminal/index.html',
'terminal/css/main.css',
'terminal/img/favicon.ico',
'terminal/img/terminal.png',
'terminal/js/main.js',
'terminal/js/polyfills.js',
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  // start caching assets
  console.log('Installing service worker...')
  event.waitUntil(
    // open a new cache space
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker Installed!!');

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('index.html'));
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    // delete any other cache which is not the current version
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
