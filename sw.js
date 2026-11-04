/* Service worker: network-first for this site's own files, cache as offline fallback.
 * Network-first means a new upload to GitHub shows up right away — no stale versions.
 * Bump VERSION when the file list changes. */
const VERSION = 'duo-v2.0.0';
const CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'css/style.css', 'css/device.css', 'css/effects.css',
  'locales/ko.js', 'locales/en.js',
  'js/i18n.js', 'js/data.js', 'js/state.js', 'js/effects.js', 'js/layout.js',
  'js/apps/common.js', 'js/apps/talk.js', 'js/apps/basic.js', 'js/apps/settings.js',
  'js/price.js', 'js/screenshot.js', 'js/capture.js', 'js/experiences.js', 'js/app.js',
  'vendor/html2canvas.min.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // fonts etc. go straight to network
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
