# Hasan's IoT Lab — Jurnal Eksplorasi IoT

Landing page berbentuk **buku/album interaktif**: lima halaman (Day 1–5), setiap halaman berisi satu video dokumentasi perjalanan eksplorasi IoT.

## Fitur

- 📖 **Buku interaktif** — animasi balik halaman (3D flip)
- 🖱️ **Navigasi klik tepi** — tepi kanan = halaman berikutnya, tepi kiri = halaman sebelumnya
- 🔘 **Dot navigasi** — 5 dot di sisi kanan buku (dengan tooltip "Day N"), klik untuk lompat ke halaman mana pun
- ⌨️ Navigasi keyboard (tombol panah kiri/kanan)
- ▶️ **Video lazy-loading** — iframe YouTube baru dimuat saat tombol play diklik

## Tech Stack

- [SvelteKit](https://svelte.dev/docs/kit) + Svelte 5 (Runes)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn-svelte](https://shadcn-svelte.com) (Button, Card, Badge, Separator, Tooltip)
- Build tool: Vite · Package manager: Bun

## Menjalankan

```sh
bun install
bun run dev          # server pengembangan
bun run check        # type check (svelte-check)
bun run build        # build produksi
bun run preview      # pratinjau hasil build
```

## Mengedit Data Halaman

Daftar video ada di `src/lib/data/days.ts`:

```ts
export const days: Day[] = [
  {
    day: 1,
    title: '…',
    summary: '…',
    videoId: '6G12yiwCpFg', // ID YouTube (bagian ?v=… pada URL)
  },
  // …
];
```

Tambah/kurangi entri sesuai kebutuhan — navigasi buku, jumlah dot, dan label halaman menyesuaikan secara otomatis.

## Struktur Proyek

```
src/
├── lib/
│   ├── components/
│   │   ├── Book.svelte        # buku interaktif + animasi flip + navigasi
│   │   ├── VideoEmbed.svelte  # pemutar YouTube (lazy)
│   │   └── ui/                # komponen shadcn-svelte
│   ├── data/days.ts           # data halaman (video per hari)
│   └── utils.ts               # helper shadcn (cn)
└── routes/
    ├── +layout.svelte
    ├── layout.css             # tema (CSS variables shadcn)
    └── +page.svelte           # landing page
```

> Catatan: proyek ini memakai alias `#lib` (bukan `$lib`) dan memaksa mode Runes Svelte 5 di `vite.config.ts`.
