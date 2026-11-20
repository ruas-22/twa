// Service worker aplikasi TWA.
// Menyimpan salinan file aplikasi di HP supaya tetap bisa dibuka tanpa internet.
// Saat ada internet, file selalu diambil yang terbaru dari GitHub, jadi file ini tidak perlu diubah
// walaupun index.html diperbarui.
const SIMPANAN = "twa";
const FILE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SIMPANAN).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {   // hapus simpanan lain yang tidak dipakai
  e.waitUntil(caches.keys()
    .then(semua => Promise.all(semua.filter(k => k !== SIMPANAN).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Ambil dari internet dulu (selalu cek ke GitHub supaya terbaru). Kalau tidak ada internet, pakai salinan.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request.url, { cache: "no-cache" })
      .then(r => { const salin = r.clone(); caches.open(SIMPANAN).then(c => c.put(e.request, salin)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});
