/**
 * Data halaman "Jurnal Eksplorasi IoT".
 *
 * ⏰ PENGINGAT (dari docs/BACKLOG.md — update tiap kali buka file ini):
 *   - 🔴 [A1] Ringkasan per Day masih TEMPLATE GENERIK — lumayan mulai ditulis
 *     ringkasan spesifik per video (6–16, lalu tarik mundur ke 1–5) saat menonton ulang.
 *   - 🟠 [B2] Overlay TOC/daftar isi — layak dipasang saat jurnal ±20 halaman (Day 20).
 *   - 🟢 [C1+C2+C3] Prerender SEO + LICENSE (MIT) + GitHub Actions CI — tiga item ringan
 *     yang masih menunggu slot waktu.
 *   - Kalau sudah 18 halaman: mulai pertimbangkan B1 (route detail /day/[n]).
 *
 * Untuk menambah Day: cukup tambah entri di bawah — dot, badge, dan navigasi
 * menyesuaikan otomatis.
 *
 * CATATAN (repo public):
 * Satu Halaman = satu hari eksplorasi = satu video YouTube.
 */

export interface Day {
	/** Nomor halaman (mulai dari 1) */
	day: number;
	/** Judul halaman yang tampil di buku */
	title: string;
	/** Ringkasan singkat yang tampil di buku */
	summary: string;
	/** ID video YouTube (bagian `?v=` pada URL, bukan URL lengkap) */
	videoId: string;
}

export const days: Day[] = [
	{
		day: 1,
		title: 'Perjalanan Eksplorasi IoT — Hari Pertama',
		summary: 'Dokumentasi video hari pertama perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '6G12yiwCpFg',
	},
	{
		day: 2,
		title: 'Perjalanan Eksplorasi IoT — Hari Kedua',
		summary: 'Dokumentasi video hari kedua perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'ehU_fGVuD50',
	},
	{
		day: 3,
		title: 'Perjalanan Eksplorasi IoT — Hari Ketiga',
		summary: 'Dokumentasi video hari ketiga perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'mCct-XNHx1o',
	},
	{
		day: 4,
		title: 'Perjalanan Eksplorasi IoT — Hari Keempat',
		summary: 'Dokumentasi video hari keempat perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'fm0a1ZmxVU0',
	},
	{
		day: 5,
		title: 'Perjalanan Eksplorasi IoT — Hari Kelima',
		summary: 'Dokumentasi video hari kelima perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'hbed7K6AWLA',
	},
	{
		day: 6,
		title: 'Perjalanan Eksplorasi IoT — Hari Keenam',
		summary: 'Dokumentasi video hari keenam perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'qmFGfv2QJrk',
	},
	{
		day: 7,
		title: 'Perjalanan Eksplorasi IoT — Hari Ketujuh',
		summary: 'Dokumentasi video hari ketujuh perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '-Otda8b5Ugk',
	},
	{
		day: 8,
		title: 'Perjalanan Eksplorasi IoT — Hari Kedelapan',
		summary: 'Dokumentasi video hari kedelapan perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'CzAnXtloUj8',
	},
	{
		day: 9,
		title: 'Perjalanan Eksplorasi IoT — Hari Kesembilan',
		summary: 'Dokumentasi video hari kesembilan perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'q37l42O1FEA',
	},
	{
		day: 10,
		title: 'Perjalanan Eksplorasi IoT — Hari Kesepuluh',
		summary: 'Dokumentasi video hari kesepuluh perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'bPa67bCf3n0',
	},
	{
		day: 11,
		title: 'Perjalanan Eksplorasi IoT — Hari Kesebelas',
		summary: 'Dokumentasi video hari kesebelas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '36H-Bevtz1U',
	},
	{
		day: 12,
		title: 'Perjalanan Eksplorasi IoT — Hari Kedua Belas',
		summary: 'Dokumentasi video hari kedua belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'v_uyWLE8Ozg',
	},
	{
		day: 13,
		title: 'Perjalanan Eksplorasi IoT — Hari Ketiga Belas',
		summary: 'Dokumentasi video hari ketiga belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '8GUnCJg8AQQ',
	},
	{
		day: 14,
		title: 'Perjalanan Eksplorasi IoT — Hari Keempat Belas',
		summary: 'Dokumentasi video hari keempat belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'DN8sUiD31Ko',
	},
	{
		day: 15,
		title: 'Perjalanan Eksplorasi IoT — Hari Kelima Belas',
		summary: 'Dokumentasi video hari kelima belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '9QfLGvqpoQU',
	},
	{
		day: 16,
		title: 'Perjalanan Eksplorasi IoT — Hari Keenam Belas',
		summary: 'Dokumentasi video hari keenam belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'Nwlqmg86_ws',
	},
];

/** URL watch YouTube dari ID video */
export function watchUrl(videoId: string): string {
	return `https://www.youtube.com/watch?v=${videoId}`;
}

/** Thumbnail video (loading tampilan awal, sebelum video diputar) */
export function thumbnailUrl(videoId: string): string {
	return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
