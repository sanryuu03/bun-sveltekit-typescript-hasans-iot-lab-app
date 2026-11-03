/**
 * Data halaman "Jurnal Eksplorasi IoT".
 *
 * CATATAN (repo public):
 * Satu Halaman = satu hari eksplorasi = satu video YouTube.
 * Ringkasan di bawah masih berupa deskripsi umum per hari — silakan direvisi
 * agar sesuai isi video masing-masing.
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
];

/** URL watch YouTube dari ID video */
export function watchUrl(videoId: string): string {
	return `https://www.youtube.com/watch?v=${videoId}`;
}

/** Thumbnail video (loading tampilan awal, sebelum video diputar) */
export function thumbnailUrl(videoId: string): string {
	return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
