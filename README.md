# TWA, aplikasi gelang alarm dingin

Aplikasi web untuk gelang Thermal Wearable Alarm (TWA). Dibuka lewat Google Chrome di HP Android,
tersambung ke gelang lewat Bluetooth (Web Bluetooth), tanpa Wi-Fi di gelang.

Isi folder

- `index.html` tampilan dan seluruh logika aplikasi (Beranda, Pengaturan Alarm, Data)
- `manifest.webmanifest` nama, ikon, dan warna saat aplikasi dipasang di layar utama HP
- `sw.js` service worker, menyimpan salinan aplikasi supaya bisa dibuka tanpa internet
- `icon-192.png`, `icon-512.png` ikon aplikasi
