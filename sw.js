// Offline support: keeps the hub working without internet after the first visit.
const CACHE = "cay-v1";
const CORE = ["./", "index.html", "config.js", "manifest.webmanifest", "assets/logo.png", "assets/logo-192.png", "assets/avatar.png", "assets/bg-dna.jpg", "assets/bg-dna.mp4"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return;          // let video range requests and feedback posts go straight through
  if (new URL(req.url).hostname === "script.google.com") return;
  e.respondWith(
    fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html")))
  );
});
