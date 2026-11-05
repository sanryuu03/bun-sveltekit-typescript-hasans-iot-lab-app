# 📌 Backlog & Catatan — Biar Tidak Lupa

> Dokumen kerja (living doc). Update ini tiap kali ada keputusan baru atau saran baru.
> Terakhir diperbarui: **5 Nov 2026** — jurnal 16 halaman + trio engineering (C1/C2/C3) dan C5 selesai.

---

## 1️⃣ Snapshot Kondisi Saat Ini (5 Nov 2026)

| Aspek | Kondisi |
|---|---|
| Jurnal | **16 halaman** (Day 1–16), semua video terverifikasi via YouTube oEmbed |
| Stack | SvelteKit 3 · Svelte 5 (Runes dipaksa) · Tailwind CSS 4 · shadcn-svelte · Bun · Vite 8 |
| Deploy | `adapter-node` + Docker multi-stage · `docker-compose` port **8098:3000** · container `hasans-iot-lab` · ✅ **live di VPS**: [hasans-iot-lab.muhammadhasan.my.id](https://hasans-iot-lab.muhammadhasan.my.id) |
| SEO & CI | Landing **prerendered** (`+page.ts`) · LICENSE MIT · GitHub Actions CI (`check` + `build`) |
| Kualitas | `bun run check` 0 error/0 warning · stress test `/stress` PASS (DOM selalu 1 card) · debounce C5 aktif (~690ms) |
| Mobile | Muat satu layar di 390×844, tanpa overflow horizontal/vertikal |
| Dokumentasi | README lengkap · `CHANGELOG.md` (terakhir `[0.18.0]`) · halaman ini |
| Workflow tambah Day | edit `src/lib/data/days.ts` → `bun run check` → commit `feat: tambah Day N` → entri `CHANGELOG [0.N.0]` → `git push` |

**Data konten yang masih "generik":** semua `summary` di `days.ts` masih kalimat template
("Dokumentasi video hari ke-N…") — Judul, videoId, tanggal rekaman (`recordedAt`),
dan topik (`topics`) sudah final/faktual; A1 hanya tersisa ringkasan naratif.

---

## 2️⃣ Saran yang Belum Dikerjakan

### 🏷️ A. Konten (paling sering disebut — mulai dari sini)

- [ ] **A1. Tulis ringkasan spesifik per Day** — `summary` di `days.ts` masih template generik.
      Cukup 1–2 kalimat per video ("Day 4: wiring ESP32 pertama, kena error kabel TX-RX"). 🟢 mudah, 15 menit
- [x] **A2. Tanggal publikasi per halaman** — ✅ selesai 5 Nov 2026: field `recordedAt` (ISO, WIB)
      & `topics` (dari hashtag deskripsi video) ditambah ke seluruh `Day` 1–16 via oEmbed/scrape
      judul+deskripsi; tampil sebagai `🗓 1 Okt 2026` + badge topik di tiap kartu buku.
      Fitur baris README + helper `recordedAtLabel()` di `days.ts`. Verifikasi: SSR + fit mobile
      390×844 tetap 840px tanpa overflow. 🟢
- [ ] **A3. Playlist YouTube "Day 1–15"** — satu link untuk semua video, memudahkan viewers & caption social. 🟢 mudah

### 🧭 B. Navigasi & Struktur (mulai dipikirkan saat halaman makin panjang)

- [ ] **B1. Halaman detail per Day (`/day/[n]`)** — landing page tetap halaman ringkas,
      klik halaman buku → route dinamis dengan deskripsi panjang, foto, catatan teknis.
      Layak mulai dieksekusi kalau jurnal sudah **20–30+ halaman**. 🟡 sedang
- [ ] **B2. TOC / daftar isi** — overlay menu (dropdown atau drawer) berisi semua Day,
      jump cepat tanpa scroll dot 1-per-1. Sekarang adalah titik nyaman untuk menambahkan. 🟡 sedang
- [ ] **B3. i18n (id/en)** — teks UI + konten dua bahasa. SvelteKit punya pola `[lang]` route. 🔴 besar, tunda

### ⚙️ C. Engineering

- [x] **C1. Prerender untuk SEO** — ✅ selesai 5 Nov 2026: `src/routes/+page.ts` berisi
      `export const prerender = true` (catatan: di Svelte versi ini opsi TIDAK boleh di
      `+page.svelte` — ternyata diabaikan dengan warning; harus di `+page(.server).ts`).
      Hasil: `build/prerendered/index.html` berisi HTML penuh 16 halaman sejak build.
- [x] **C2. LICENSE file (MIT)** — ✅ selesai 5 Nov 2026: file `LICENSE` (MIT, © Muhammad Hasan);
      README bagian Lisensi diperbarui + badge.
- [x] **C3. GitHub Actions CI** — ✅ selesai 5 Nov 2026: `.github/workflows/ci.yml` — bun install
      → `bun run check` → `bun run build` pada setiap push/PR ke main.
- [ ] **C4. Build di dalam Docker** — pattern sekarang menyalin `build/` hasil build manual di host
      (konsisten dengan `sveltekit-my-portfolio`); risiko: lupa menjalankan `bun run build` setelah edit kode.
      ✅ *Update 5 Nov 2026*: pattern tunggal ini **terverifikasi end-to-end di VPS** oleh Hasan —
      `docker compose up -d --build` sukses, situs live & menjawab A2 metadata terbaru.
      Yang tersisa: migrasi agar `bun run build` berjalan DI DALAM image (hilangkan langkah manual
      di host; sehingga `git pull && docker compose up --build` langsung cukup). 🟡 sedang
- [x] **C5. Debounce klik saat animasi di tengah jalan** — ✅ selesai 5 Nov 2026: guard `animating`
      di `Book.svelte` — commit navigasi diabaikan selama window animasi (~690ms). Dampak pada
      `/stress`: interval skenario di-naikkan ke 800ms supaya deterministik (sudah diverifikasi
      PASS 2 putaran; README tabel stress di-update).

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

1. ~~**A1** ringkasan spesifik 15 video~~ → **masih jadi #1** (butuh catatan Anda saat menonton ulang video)
2. ~~**C1 prerender + C2 LICENSE + C3 CI**~~ ✅ selesai 5 Nov
3. **A3 playlist YouTube + D1 link-in-comment** — sebelum posting hero di LinkedIn
4. **B2 TOC overlay** — saat merasa buku mulai menggelinding panjang (~Day 20)
5. **B1 halaman detail** + **C4 build in-Docker** — ticket berikutnya

> Prinsip: **A1 dulu** — dokumen konten (`days.ts`) adalah satu-satunya file yang akan terus
> disentuh manusia; panggil semua perubahan baru lewat sana dan biarkan komponen lain menyesuaikan sendiri.
