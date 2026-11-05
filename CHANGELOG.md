# Changelog

Semua perubahan penting pada project **Hasan's IoT Lab** didokumentasikan di sini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/),
versi mengikuti [SemVer](https://semver.org/id/). Tanggal dalam format `d MMM yyyy` (WIB).

## [0.20.0] — 5 Nov 2026

### Added
- **A3 · Playlist lengkap semua Day** — trik resmi YouTube `watch_videos?video_ids=` menyusun
  playlist anonim permanen (`TLGGJTXIMAa-pNAwNTExMjAyNg`) berisi 16 video jurnal urut Day 1–16
  (terverifikasi via browser: panel playlist 16 entri).
- Footer landing kini punya link **"Playlist lengkap · Day 1–16"** (ikon YouTube, teks dinamis
  dari `days.length`) — const `playlistUrl` di `days.ts` dengan komentar cara regen.
- README: entri fitur playlist + pengingat regen `playlistUrl` saat menambah Day baru.

### Fixed
- Dev server 500 di `/` setelah menambah import ikon baru — penyebab: cache dep-optimizer Vite
  (`node_modules/.vite`) basi; clear + restart dev server beres. Import path ikon dipastikan valid
  (`remixicon-svelte` exports `./icons/*` → `dist/icons/*.svelte`); ikon `RiYoutubeLine` sendiri
  tidak bermasalah.

## [0.19.0] — 5 Nov 2026

### Added
- **Dot navigasi window (B2-lite)** — dot tidak lagi 1-per-halaman jika jumlah halaman besar:
  tepi (Day 1 & terakhir) selalu tampil, halaman aktif ±2, sisanya "…" yang dapat diklik
  (lompat kasar ke tengah celah). Mobile `390×844` kini hanya 5–9 kontrol dot.
  Verifikasi: window bergeser benar di Day 1/10/16; lompat via "…", fit mobile 840px,
  5 skenario `/stress` PASS.

## [0.18.0] — 5 Nov 2026

### Added
- **A2 · Metadata konten per halaman** — setiap `Day` kini membawa `recordedAt` (tanggal
  rekaman WIB, dari timestamp judul video) dan `topics` (dari hashtag deskripsi YouTube)
  untuk Day 1–16 — ditarik otomatis via oEmbed + scrape deskripsi.
- Kartu buku menampilkan `🗓 <tanggal>` + badge topik (`arduino`, `esp32`, `touch-sensor`,
  `servo`, `sg90`, `motor-servo`...).
- Helper `recordedAtLabel()` untuk format tanggal id-ID.
- Verifikasi: `svelte-check` bersih, SSR HTML memuat tanggal/topik, fit mobile 390×844
  tetap 840px tanpa overflow, sweep 3 halaman jalan normal.

## [0.17.0] — 5 Nov 2026

### Added
- **C1 · Prerender SEO** — halaman landing di-prerender penuh (`src/routes/+page.ts`);
  crawler dapat HTML 16 halaman sejak build, load instan.
- **C2 · LICENSE (MIT)** — file `LICENSE`; README bagian lisensi + badge.
- **C3 · GitHub Actions CI** — `.github/workflows/ci.yml`: `bun install` → `bun run check`
  → `bun run build` di setiap push/PR ke main.
- **C5 · Debounce navigasi** — klik selama animasi keluar (~690ms) kini diabaikan di `Book.svelte`;
  skenario `/stress` dinaikkan jadanya 800ms agar deterministik (varifikasi PASS ×2 putaran).

### Fixed
- **Araah halaman pada opsi halaman Svelte**: `export const prerender` di `+page.svelte`
  diabaikan diam-diam (warning) — pindah ke `+page.ts`.

## [0.16.0] — 5 Nov 2026

### Added
- **Day 16** — `Nwlqmg86_ws`
- Jurnal sekarang 16 halaman.

## [0.15.0] — 4 Nov 2026

### Added
- **Day 15** — `9QfLGvqpoQU`
- Jurnal sekarang 15 halaman (tiga minggu penuh eksplorasi!).

## [0.14.0] — 4 Nov 2026

### Added
- **Day 13** — `8GUnCJg8AQQ`
- **Day 14** — `DN8sUiD31Ko`
- Jurnal sekarang 14 halaman.

## [0.12.0] — 4 Nov 2026

### Added
- **Day 11** — `36H-Bevtz1U`
- **Day 12** — `v_uyWLE8Ozg`
- Jurnal sekarang 12 halaman.

## [0.10.0] — 3 Nov 2026

### Added
- **Day 9** — `q37l42O1FEA`
- **Day 10** — `bPa67bCf3n0`
- Jurnal sekarang 10 halaman; badge header, subtitle & dot menyesuaikan otomatis dari `days.length`.

## [0.8.0] — 2 Nov 2026

### Added
- **Day 6–8** — `qmFGfv2QJrk`, `-Otda8b5Ugk`, `CzAnXtloUj8`
- Badge & subtitle landing page kini **dinamis dari `days.length`** (tidak lagi hardcode jumlah hari).

## [0.5.0] — 2 Nov 2026

### Added
- **Halaman stress test manual** di rute `/stress`:
  5 skenario (sweep, rapid-fire ×20, bolak-balik ×12, lompat dot, keyboard),
  panel metrik live (card/DOM/peak) dan log PASS/FAIL otomatis.
- Dokumentasi lengkap skenario stress test di README.

### Fixed
- **Bug elemen lama tertinggal di DOM (ghost node)** setelah animasi balik halaman —
  sistem transisi sveltekit (`in:`/`out:`) diganti mesin animasi CSS + timer manual.
- **Tampilan mobile**: tinggi halaman buku otomatis (grid-stacking, dulu aspect-ratio paksa),
  dot navigasi mobile baru (horizontal + tombol prev/next), spacing dirapatkan muat satu layar.

## [0.3.0] — 1 Nov 2026

### Added
- **Landing page buku interaktif** — jurnal eksplorasi IoT Day 1–5:
  - `Book.svelte`: animasi flip 3D, zona klik tepi kanan/kiri, dot navigasi + tooltip, keyboard ←/→
  - `VideoEmbed.svelte`: pemutar YouTube lazy-loading (`youtube-nocookie`)
  - `days.ts`: pusat data halaman (mudah diedit)
- **Deployment Docker** — `@sveltejs/adapter-node`, `Dockerfile` multi-stage
  (`oven/bun` build-deps → `node:22` runtime), `docker-compose` port **8098:3000**.
- **Favicon baru** — tile hijau tema `--primary` + ikon chip (konsisten dengan logo header).

## [0.2.0] — 1 Nov 2026

### Added
- Setup [shadcn-svelte](https://shadcn-svelte.com) + komponen: Button, Card (+Action), Badge, Separator, Tooltip
- Alias proyek diset ke `#lib` (SvelteKit 3 tidak lagi memakai `$lib`)

## [0.1.0] — 31 Okt 2026

### Added
- Scaffold awal SvelteKit 3 + Svelte 5 (Runes) + TypeScript, package manager Bun.
