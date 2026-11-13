// Service worker TWA Bluetooth.
// Menyimpan file aplikasi di HP supaya halaman tetap bisa dibuka tanpa internet.
// Naikkan angka versi setiap kali ada file aplikasi yang diubah.
const VERSI = "twa-v2";
const FILE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(semua => Promise.all(semua.filter(k => k !== VERSI).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Coba ambil dari internet dulu supaya selalu versi terbaru,
// kalau gagal (tidak ada internet) pakai salinan yang tersimpan.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const salin = r.clone(); caches.open(VERSI).then(c => c.put(e.request, salin)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});
