# Mini Job Fair UPT BLK Tulungagung 2026 — CORS Proxy build

## Perubahan pada paket ini
- `index.html` dan `admin.html` menggunakan endpoint satu-origin `/.netlify/functions/api`.
- `netlify/functions/api.js` meneruskan POST dari browser ke Google Apps Script `/exec`.
- `netlify.toml` mendaftarkan direktori Netlify Functions.
- `Code.gs` dipertahankan; tidak perlu diedit untuk perbaikan CORS ini.

## PENTING: cara deploy
Paket ini **tidak cukup diunggah dengan drag-and-drop biasa** karena Netlify Functions harus dipaketkan/dideploy sebagai fungsi server. Gunakan Netlify CLI (tetap deploy manual, tanpa Git) atau hubungkan Git. Langkah CLI Windows:

1. Ekstrak ZIP ini ke folder komputer, misalnya `C:\MJF\final_mjf`. Pastikan `index.html`, `admin.html`, `netlify.toml`, dan folder `netlify` berada langsung di dalam folder `final_mjf`.
2. Install Node.js versi LTS jika belum ada: https://nodejs.org/
3. Buka Command Prompt atau PowerShell, lalu jalankan:
   `npm install -g netlify-cli`
4. Masuk ke folder proyek (sesuaikan lokasi):
   `cd C:\MJF\final_mjf`
5. Login: `netlify login`
6. Hubungkan ke situs Netlify yang sudah ada: `netlify link` lalu pilih situs `mjfblktulungagung`.
7. Deploy ke website aktif: `netlify deploy --prod`

Netlify CLI akan mengunggah file website DAN fungsi `api.js`. Tidak perlu membuat situs baru.

## Tes setelah deploy
- Buka `https://mjfblktulungagung.netlify.app/.netlify/functions/api` di browser. Respons `405` dengan pesan `Gunakan metode POST` berarti fungsi sudah terpasang dan hanya menerima POST; itu bukan error CORS.
- Buka website, lalu tes muat statistik dan login admin.
- Lakukan satu pendaftaran percobaan hanya setelah tes statistik/admin berhasil.

## Backend Google Apps Script
URL `/exec` saat ini sudah ditanam di `netlify/functions/api.js`. `Code.gs` tidak perlu diubah selama deployment Apps Script yang sama masih aktif dan akses Web App sesuai kebutuhan.

## Catatan ukuran dokumen
Netlify Functions memiliki batas ukuran payload. File PDF/logo yang dikirim sebagai Base64 dapat membesar saat dikodekan. Jika unggahan dokumen besar gagal, kita perlu mengubah alur unggah agar file dikirim langsung ke penyimpanan, bukan melalui satu payload Function.


PENTING: Folder backend/Code.gs sengaja tidak disertakan dalam paket Netlify. Kode Code.gs tetap berada di proyek Google Apps Script dan tidak perlu diunggah ke Netlify. Jangan masukkan PIN admin atau Spreadsheet ID ke file frontend/Netlify.
