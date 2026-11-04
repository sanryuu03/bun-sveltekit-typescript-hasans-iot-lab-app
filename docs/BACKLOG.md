# 📌 Backlog & Catatan — Biar Tidak Lupa

> Dokumen kerja (living doc). Update ini tiap kali ada keputusan baru atau saran baru.
> Terakhir diperbarui: **4 Nov 2026** — kondisi saat jurnal 15 halaman.

---

## 1️⃣ Snapshot Kondisi Saat Ini (4 Nov 2026)

| Aspek | Kondisi |
|---|---|
| Jurnal | **15 halaman** (Day 1–15), semua video terverifikasi via YouTube oEmbed |
| Stack | SvelteKit 3 · Svelte 5 (Runes dipaksa) · Tailwind CSS 4 · shadcn-svelte · Bun · Vite 8 |
| Deploy | `adapter-node` + Docker multi-stage · `docker-compose` port **8098:3000** · container `hasans-iot-lab` |
| Kualitas | `bun run check` 0 error/0 warning · stress test `/stress` PASS (DOM selalu 1 card, tanpa ghost) |
| Mobile | Muat satu layar di 390×844, tanpa overflow horizontal/vertikal |
| Dokumentasi | README lengkap · `CHANGELOG.md` (terakhir `[0.15.0]`) · halaman ini |
| Workflow tambah Day | edit `src/lib/data/days.ts` → `bun run check` → commit `feat: tambah Day N` → entri `CHANGELOG [0.N.0]` → `git push` |

**Data konten yang masih "generik":** semua `summary` di `days.ts` masih kalimat template
("Dokumentasi video hari ke-N…") — hanya Judul & videoId yang sudah final.

---

## 2️⃣ Saran yang Belum Dikerjakan

### 🏷️ A. Konten (paling sering disebut — mulai dari sini)

- [ ] **A1. Tulis ringkasan spesifik per Day** — `summary` di `days.ts` masih template generik.
      Cukup 1–2 kalimat per video ("Day 4: wiring ESP32 pertama, kena error kabel TX-RX"). 🟢 mudah, 15 menit
- [ ] **A2. Tanggal publikasi per halaman** — timestamp rekaman sudah tersedia (angka unix di
      judul video awal, mis. `1790872050`). Tampilkan `2 Okt 2026` di header card + tooltip dot. 🟡 sedang
- [ ] **A3. Playlist YouTube "Day 1–15"** — satu link untuk semua video, memudahkan viewers & caption social. 🟢 mudah

### 🧭 B. Navigasi & Struktur (mulai dipikirkan saat halaman makin panjang)

- [ ] **B1. Halaman detail per Day (`/day/[n]`)** — landing page tetap halaman ringkas,
      klik halaman buku → route dinamis dengan deskripsi panjang, foto, catatan teknis.
      Layak mulai dieksekusi kalau jurnal sudah **20–30+ halaman**. 🟡 sedang
- [ ] **B2. TOC / daftar isi** — overlay menu (dropdown atau drawer) berisi semua Day,
      jump cepat tanpa scroll dot 1-per-1. Sekarang adalah titik nyaman untuk menambahkan. 🟡 sedang
- [ ] **B3. i18n (id/en)** — teks UI + konten dua bahasa. SvelteKit punya pola `[lang]` route. 🔴 besar, tunda

### ⚙️ C. Engineering

- [ ] **C1. Prerender untuk SEO** — `export const prerender = true` di `+page.svelte` (halaman ini
      statis, aman). Hasil: HTML penuh tersaji bagi crawler + load instan. 🟢 mudah
- [ ] **C2. LICENSE file (MIT)** — README sekarang hanya menyebut "bebas non-komersial" secara verbal;
      repo publik tanpa LICENSE secara hukum berarti "all rights reserved". Tentukan lalu taruh filenya. 🟢 mudah
- [ ] **C3. GitHub Actions CI** — workflow 2 langkah: `bun install` → `bun run check` (dan optionally
      `bun run build`) pada tiap push/PR. Menjaga kualitas commit pun jadi terverifikasi otomatis. 🟢 mudah
- [ ] **C4. Build di dalam Docker** — pattern sekarang menyalin `build/` hasil build manual di host
      (konsisten dengan `sveltekit-my-portfolio`); risiko: lupa menjalankan `bun run build` setelah edit kode.
      Cara migrasinya: stage `oven/bun` menjalankan `bun run build` di dalam image; setelah itu
      `docker compose up --build` tanpa langkah manual apa pun. 🟡 sedang
- [ ] **C5. Debounce klik saat animasi di tengah jalan** — kosmetik-murni: klik sangat cepat "memotong"
      animasi (DOM tetap aman, DOM tetap bersih — stress test PASS aktif). Tambahkan guard paling
      sederhana: abaikan input saat `leaving` belum selesai. 🟢 mudah

### 📢 D. Distribusi

- [ ] **D1. Tautan YouTube di komentar (LinkedIn)** — post LinkedIn dengan link dalam teks cenderung
      di-throttle reach; konvensi yang terbukti: taruh link di **komentar pertama** sendiri. 🟢 mudah
- [ ] **D2. Versi EN dari caption** — untuk audience lintas negara (opsional, pas waktu mulai punya
      viewer internasional). 🟢 mudah

---

## 3️⃣ Saran yang Sudah Dikerjakan ✅

| Saran | Dipenuhi di |
|---|---|
| Badge & subtitle landing dinamis dari `days.length` | `days.length` di `+page.svelte` ([0.8.0]) |
| Halaman stress test manual (`/stress`) | [0.5.0] |
| Fix ghost node (animasi manual CSS) + mobile | [0.5.0] |
| Dokumentasi lengkap (README + CHANGELOG) | [0.3.0]+ |
| Docker + adapter-node port 8098:3000 | [0.3.0] |
| Favicon sesuai identitas (CPU hijau) | [0.3.0] |

---

## 4️⃣ Urutan Eksekusi yang Disarankan

Kalau mau satu "sprint kecil minggu-minggu ini":

1. **A1** ringkasan spesifik 15 video (konten akhirnya setara dengan kerja rekamannya)
2. **C1 prerender + C2 LICENSE + C3 CI** — tiga hal ringan, langsung mengangkat kualitas repo publik
3. **A3 playlist YouTube + D1 link-in-comment** — sebelum posting hero di LinkedIn
4. **B2 TOC overlay** — saat merasa buku mulai menggelinding panjang
5. **B1 halaman detail** + **C4 build in-Docker** — ticket berikutnya

> Prinsip: **A1 dulu** — dokumen konten (`days.ts`) adalah satu-satunya file yang akan terus
> disentuh manusia; panggil semua perubahan baru lewat sana dan biarkan komponen lain menyesuaikan sendiri.
