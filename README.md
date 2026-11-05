# Hasan's IoT Lab — Jurnal Eksplorasi IoT

[![CI](https://github.com/sanryuu03/bun-sveltekit-typescript-hasans-iot-lab-app/actions/workflows/ci.yml/badge.svg)](https://github.com/sanryuu03/bun-sveltekit-typescript-hasans-iot-lab-app/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Changelog](https://img.shields.io/badge/changelog-CHANGELOG.md-8A2BE2)](./CHANGELOG.md)
[![Stress Test](https://img.shields.io/badge/uji-manual%20%2Fstress-brightgreen)](#-stress-test-manual)

Landing page berbentuk **buku/album interaktif**: halaman per hari (jumlah mengikuti data terkini di `src/lib/data/days.ts` — saat ini 16 halaman, Day 1–16), setiap halaman berisi satu video dokumentasi perjalanan eksplorasi IoT.

> 🌐 **Live di produksi**: [https://hasans-iot-lab.muhammadhasan.my.id](https://hasans-iot-lab.muhammadhasan.my.id) — deploy Docker di VPS.

> Repo ini publik. Data project (judul, ringkasan, ID video) terpusat di satu file — silakan fork dan sesuaikan identitas/jurnal Anda sendiri.

---

## ✨ Fitur

| Fitur | Detail |
|---|---|
| 📖 Buku interaktif | Animasi balik halaman 3D (leaf fold) + ilusi ketebalan tumpukan halaman di tepi kanan |
| 🧭 Prerender SEO | Landing page di-prerender saat build (`prerender = true`) — crawler dapat HTML penuh |
| 📅 Metadata konten | Setiap halaman menampilkan **tanggal rekaman** + **topik** — diisi dari metadata YouTube (timestamp judul + hashtag deskripsi) |
| 🖱️ Klik tepi buku | Tepi kanan = halaman berikutnya, tepi kiri = halaman sebelumnya (ikon panah muncul saat hover) |
| 🔘 Dot navigasi | **Window rapi**: dot Day 1 & terakhir + ±2 sekitar halaman aktif, sisanya "…" (klik "…" = lompat kasar). **Desktop**: vertikal di sisi buku + tooltip, **Mobile**: horizontal + prev/next |
| ⌨️ Keyboard | Tombol panah ←/→ untuk mundur/maju |
| 👆 Kenyamanan mobile | Tinggi halaman mengikuti isi (tanpa overflow), muat satu layar di 390×844 |
| ▶️ Video lazy | Iframe YouTube baru dibuat saat tombol play diklik (hemat bandwidth, tidak ada autoplay paksa) |
| 🔗 Mode `youtube-nocookie` | Privasi ramah + `rel=0`, `modestbranding=1` |
| 📱 Preview link sosial | Tag **Open Graph + Twitter Card** penuh — share link ke WhatsApp/LinkedIn/Telegram tampil judul + deskripsi + gambar thumbnail Day 1 (bukan telanjang berupa URL) |
| 📺 Playlist lengkap | Link **"Playlist lengkap · Day 1–N"** di footer → playlist YouTube berisi semua video jurnal berurutan (const `playlistUrl` di `days.ts`; regen saat Day baru) |
| 🌗 Tema | Dark mode (dipaksa via `class="dark"` di `app.html`) dengan warna primary hijau tema |
| ♿ Aksesibilitas | `aria-label` di seluruh kontrol, `aria-current` pada dot aktif, `svelte:head` title/meta description |

## 🧰 Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | [SvelteKit 3](https://svelte.dev/docs/kit) + Svelte 5 (**Runes dipaksa aktif** via `vite.config.ts`) |
| UI | [shadcn-svelte](https://shadcn-svelte.com) — Button, Card (+Action), Badge, Separator, Tooltip |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (plugin Vite) |
| Build | Vite 8 | 
| Runtime | Node ≥ 22.17 · Package manager [Bun](https://bun.sh) |
| Deploy | `@sveltejs/adapter-node` + Docker (multi-stage) |

## 🚀 Menjalankan

```sh
bun install
bun run dev            # http://localhost:5280 (atau default vite)
bun run dev --host     # agar bisa diakses dari HP di jaringan yang sama
bun run check          # type check + komponen (svelte-check, harus 0 error)
bun run build          # build produksi → build/
bun run preview        # pratinjau hasil build produksi
```

## 📁 Struktur Proyek

```
src/
├── lib/
│   ├── components/
│   │   ├── Book.svelte        # buku interaktif: flip, dot, keyboard, zona klik tepi
│   │   ├── VideoEmbed.svelte  # pemutar YouTube lazy (thumbnail → play → iframe)
│   │   └── ui/                # komponen shadcn-svelte (button, card, badge, dsb.)
│   ├── data/
│   │   └── days.ts            # ☝️ SATU-SATUNYA file yang perlu diedit untuk konten
│   └── utils.ts               # helper cn() milik shadcn
└── routes/
    ├── +layout.svelte         # import tema + TooltipProvider
    ├── layout.css             # CSS variables tema shadcn (@theme inline)
    ├── +page.svelte           # landing page (header, hero, footer, <Book/>)
    └── +page.svelte           # meluas: juga diisi SEO di <svelte:head>
```

File penting lain: `app.html` (`class="dark"`, `theme-color`), `favicon.svg` di `src/lib/assets`,
`components.json` (konfigurasi shadcn CLI — alias sudah diset ke `#lib`), `Dockerfile`, `docker-compose.yaml`.

## 📝 Mengedit Data Halaman

Semua konten ada di `src/lib/data/days.ts`:

```ts
export interface Day {
	day: number;         // nomor halaman (1, 2, 3, …)
	title: string;       // judul di halaman buku
	summary: string;     // 1–2 kalimat ringkasan (di-clamp 2 baris)
	videoId: string;     // ID YouTube — bagian ?v=… dari URL watch
	recordedAt: string;  // tanggal rekaman ISO `YYYY-MM-DD` (WIB) — dari timestamp di judul video
	topics: string[];    // topik hari itu — dari hashtag deskripsi video (tanpa '#')
}

export const days: Day[] = [ /* … */ ];
```

- **Menambah/mengurangi hari**: cukup ubah isi array — jumlah dot, label halaman, navigasi, dan zona klik menyesuaikan otomatis. ⚠️ Saat menambah Day baru juga **regen `playlistUrl`** (lihat komentar di atas const-nya) agar playlist YouTube ikut berisi video terbaru.
- **Cara ambil `videoId`**: dari `https://www.youtube.com/watch?v=`**`hbed7K6AWLA`** → `videoId: 'hbed7K6AWLA'`.
- **Judul rapi**: ambil judul asli video dari [YouTube oEmbed](https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D<h>&format=json) sebelum dipakai.
- **`recordedAt` & `topics`**: timestamp terlihat di judul video mentah (`1790872050 - day 1 …`); hashtag topik ada di deskripsi video. Keduanya tampil sebagai `🗓 <tanggal>` + badge di kartu.
- Thumbnail otomatis dari `i.ytimg.com/vi/<videoId>/hqdefault.jpg` (tidak perlu disimpan lokal).
- Ringkasan disarankan ≤ 2 baris (deskripsi akan dipangkas `line-clamp-2` di layar kecil).
- ⏰ Di bagian atas `days.ts` ada pengingat backlog (A1 ringkasan spesifik, B2 TOC, dst.) — selalu cek saat mengedit.

## 📖 Arsitektur Buku (Book.svelte)

```
<section> (w-min(92vw,660px))
 ├─ <nav> dot vertikal window (desktop, absolute kanan)
 ├─ .book  [perspective 1800px]
 │   ├─ 2 layer tumpukan halaman (ilusi ketebalan)
 │   ├─ .grid (tiling: semua halaman menempati sel sama)
 │   │   ├─ {#key current} → halaman aktif  (+ kelas anim)
 │   │   ├─ {#if leaving}   → halaman keluar (+ kelas anim), dihapus setelah animasi
 │   │   └─ zona klik tepi kiri/kanan (absolute, z-30, 36px)
 │   └─ (spine gradient di dalam halaman)
 ├─ <nav> kontrol mobile (dot horizontal + prev/next)
 └─ hint ketuk tepi (mobile saja)
```

### Mesin animasi (penting!)

Animasi balik halaman **sengaja tidak memakai sistem transition Svelte** (`in:`/`out:`/`transition:`).
Pada versi Svelte yang dipakai saat ini, elemen lama terbukti tetap tertinggal di DOM
(ghost node yang menumpuk — terverifikasi lewat fixture minimal). Solusinya:

1. Saat navigasi (`commit()`), halaman lama dipindahkan ke state `leaving`, halaman baru dirender via `{#key}`.
2. Kedua halaman menumpuk di sel grid yang sama, urutan layar dikontrol **z-index** (`z-20` di atas), bukan urutan DOM.
3. Animasi murni CSS keyframes:

| Kelas | Arah | Peran |
|---|---|---|
| `anim-leaf-out` | maju | halaman lama melipat menjauh ke kiri (`rotateY 0 → −105°`, backface hidden) |
| `anim-leaf-in` | mundur | halaman baru datang terlipat dari kiri (`rotateY −105° → 0`) |
| `anim-reveal` | maju | halaman baru muncul halus di bawah daun |
| `anim-fade-old` | mundur | halaman lama memudar di bawah daun |

4. Setelah `640ms + 50ms`, `setTimeout` mengangkat `leaving` dari state → node lama dihapus dari DOM. Timer lama selalu di-`clearTimeout` setiap navigasi.
5. **Guard C5**: selama window animasi (~690ms), `commit()` mengabaikan input navigasi baru (klik tepi, dot, keyboard) — animasi tidak bisa dipotong; pasti beres setelah window. Inilah alasan skenario `/stress` dipatok interval ≥ 800ms.

**Jangan kembalikan ke `in:`/`out:` milik Svelte** kecuali bug tersebut sudah dikonfirmasi terperbaiki — gunakan cara manual ini.

## 🚢 Deployment (Docker)

> ⚠️ Image meng-`COPY` folder `build/` — jadi **selalu jalankan build sebelum docker build**.

```sh
bun run build                 # generate build/ (adapter-node)
docker compose up -d --build  # host :8098 → container :3000
docker compose logs -f        # pantau log
```

### Flow produksi di VPS (yang dipakai saat ini)

Build dijalankan **di mesin lokal** (jauh lebih cepat & hemat resource VPS), lalu artefaknya
di-salin ke VPS untuk di-bangun sebagai image Docker:

```sh
# 1. di mesin lokal — build fresh artefak adapter-node
bun run build

# 2. salin artefak minimum ke direktori repo di VPS
#    (IP/port/direktori VPS adalah data Anda sendiri — isi langsung di terminal,
#     JANGAN ditulis di repo publik)
scp -P <PORT> -r build package*.json Dockerfile docker-compose.yaml root@<VPS_HOST>:/root/<direktori>/ 

# 3. di VPS — bangun image + jalankan kontainer
docker compose up -d --build
```

Hasil live: **[https://hasans-iot-lab.muhammadhasan.my.id](https://hasans-iot-lab.muhammadhasan.my.id)**

Catatan menyeluruh:
- Arsitekturnya memakai `Dockerfile` multi-stage: `oven/bun:1-alpine` (install deps produksi + lockfile frozen) → `node:22-alpine` (`node build`).
- `docker-compose.yaml`: container `hasans-iot-lab`, `restart: always`, port **8098:3000**.
- SvelteKit 3 butuh Node ≥ 22.17 — jangan downgrade ke `node:20` (project lama masih boleh, project ini tidak).
- Ingin build di dalam container (tanpa `bun run build` manual)? Ubah stage `deps` menjadi build stage yang menjalankan `bun run build` lalu `COPY --from=build /app/build`. Pattern sekarang sengaja mengikuti project `sveltekit-my-portfolio` untuk konsistensi.
- `.dockerignore` menjaga context kecil: yang dibutuhkan image hanya `package.json`, `bun.lock`, dan `build/`.
- 💡 Karena kontainer menjalankan `build/` dari host (bukan build ulang di dalam image), kalau suatu waktu `git pull` di VPS di bagian repo tapi lupa membangun ulang `build/`, `docker compose up --build` akan diam-diam menjalankan kode **lama** — pastikan `bun run build` menghasilkan `build/` yang belum lama.

## 🧩 Catatan Khusus Proyek Ini

- **Alias `#lib`, bukan `$lib`** — SvelteKit 3 menghapus `$lib`; semua import memakai `#lib` (didukung `package.json` `imports`). Jika Anda menambah komponen shadcn lagi, `components.json` sudah diset ke `#lib`.
- **Runes dipaksa aktif** melalui `compilerOptions.runes` di `vite.config.ts` — file component satu-gaya-runes; pengecualian hanya untuk `node_modules`.
- Config svelte hidup di `vite.config.ts` (plugin `sveltekit()`), bukan `svelte.config.js`, karena project ini memakai setup template `sv` versi baru.
- `bun run check` **wajib 0 error/0 warning** sebelum commit.
- Favicon: tile hijau `--primary` + ikon chip (SVG inline otomatis sebagai data-URI oleh SvelteKit).

## 🧪 Stress Test Manual

Halaman `src/routes/stress/+page.svelte` — alat verifikasi interaktif untuk mengecek sendiri apakah DOM tetap bersih (tidak ada elemen lama yang tertinggal) setelah berapa kali pun navigasi.

```sh
bun run dev
# buka http://localhost:5280/stress
```

### Panel

| Panel | Arti |
|---|---|
| **card sekarang** | jumlah halaman buku di DOM — target steady **1** |
| **video embed** | jumlah `.aspect-video` — iframe YouTube hanya ada jika diputar |
| **total DOM node** | total elemen dokumen — dipantau agar tidak tumbuh terus |
| **puncak card** | nilai tertinggi card selama skenario — **≤ 2 wajar** (halaman aktif + daun keluar yang sedang beranimasi) |
| **Log hasil** | riwayat skenario dengan status PASS/FAIL otomatis |

### Skenario bawaan

| Skenario | Apa yang diuji | Target akhir |
|---|---|---|
| Sweep maju ×5 | klik next berurutan @800ms — setiap klik di luar window animasi | Hari Keenam |
| Rapid-fire ×20 (0ms) | klik tercepat; hanya klik pertama diterima (guard C5) | Hari Kedua |
| Bolak-balik ×12 | next↔prev berselang @800ms, netto 0 | Hari Pertama |
| Lompat dot 1→16→1 | lompatan jauh via dot tepi (1 & terakhir selalu tampil) | Hari Pertama |
| Keyboard → ×2 | `KeyboardEvent` ArrowRight nyata; klik ke-2 di-debounce | Hari Kedua |

> **Catatan C5 (debounce):** selama animasi keluar berjalan (~690ms), input navigasi
> diabaikan — klik yang jatuh di tengah window tidak memotong animasi. Jeda semua skenario
> di atas sudah diatur supaya deterministik terhadap window tersebut.

**Kriteria PASS** (dicek otomatis setelah skenario selesai + 850ms jeda settle):
1. Card yang tersisa di DOM === 1 (tidak ada elemen halaman lama yang tertinggal / bocor).
2. Halaman akhir sesuai target skenario.
3. Puncak card selama animasi ≤ 2 (wajar: halaman aktif + daun keluar).

### Cara kerja & memutasi

- Panel mengukur via DOM query setiap 200ms di dalam `$effect` (opsi disample: `[data-slot=card]`, `[data-slot=card-title]`, `.aspect-video`).
- Skenario adalah **klik programatik nyata** (`el.click()` pada tombol/dot yang sama seperti interaksi manusia) — bukan manipulasi state internal, jadi yang diuji adalah perilaku aplikasi sungguhan.
- Keyboard disimulasikan dengan `window.dispatchEvent(new KeyboardEvent('keydown', …))` agar terintersep di `svelte:window onkeydown` komponen `Book`.
- **Menambah skenario baru**: tambahkan entri di array `scenarioDefs` (di atas `runScenario()`, bagian bawah file) — format `steps: [{ sel, delay, repeats }]`. `sel` bisa selector DOM (`aria-label`) atau `key:<nama-tombol>`.
- Log dibatasi 12 entri terbaru; setiap skenario otomatis reset ke Day 1 sebelum dijalankan.

> Rute ini utilitas dev: tidak diindeks (`noindex`), aman untuk dihapus, dan tidak memengaruhi landing page.

## 🗺️ Ide & Backlog

Semua ide pengembangan, saran, dan urutan eksekusinya terdokumentasi di **[docs/BACKLOG.md](./docs/BACKLOG.md)** —
termasuk snapshot kondisi terkini dan checklist yang di-update berkala.

## 📄 Lisensi & Kredit

Kode template: **[MIT](./LICENSE)** — bebas digunakan, dimodifikasi, dan di-distribusikan.
Konten video merupakan milik channel **FullStackWith Hasan** — silakan fork & jadikan jurnal digital Anda sendiri.
