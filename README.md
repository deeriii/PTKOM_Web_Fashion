# FITCAMP Frontend — versi penyempurnaan tampilan

## Isi proyek
- `index.html`, `style.css`, `script.js`: halaman Home dan analisis outfit.
- `gallery.html`, `gallery.css`, `gallery.js`: halaman Gallery, filter, pencarian, dan modal outfit.
- `account.html`, `account.css`, `account.js`: halaman akun, daftar/masuk demo, profil, dan riwayat outfit.

## Cara menjalankan
1. Ekstrak ZIP ini ke folder biasa.
2. Buka folder tersebut di Visual Studio Code.
3. Jika tersedia, klik kanan `index.html` lalu pilih **Open with Live Server**. Bisa juga buka `index.html` langsung di browser.
4. Navigasi ke Gallery dan Account melalui menu di bagian atas.

## Catatan aset gambar
ZIP awal yang diberikan tidak menyertakan folder `images/`, sementara JavaScript merujuk ke file seperti `images/baju/tshirt.jpg`, `images/celana/jeans.jpg`, `images/sepatu/sneakers.jpg`, dan `images/gallery/outfit1.jpg` sampai `outfit8.jpg`. Tambahkan aset gambar tersebut sesuai nama dan foldernya agar foto produk dan galeri tampil. Ini tidak menghalangi halaman HTML/CSS dibuka, tetapi gambar tidak akan muncul sampai asetnya tersedia.

## Catatan fitur
Proyek ini masih frontend statis. Data akun dan riwayat disimpan di `localStorage` browser, bukan database/server. Jangan gunakan password sungguhan untuk demo ini.
