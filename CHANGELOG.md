# Changelog

Semua perubahan penting pada project **Hasan's IoT Lab** didokumentasikan di sini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/),
versi mengikuti [SemVer](https://semver.org/id/). Tanggal dalam format `d MMM yyyy` (WIB).

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
