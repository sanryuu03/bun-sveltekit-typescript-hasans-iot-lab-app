/**
 * Data halaman "Jurnal Eksplorasi IoT".
 *
 * ⏰ PENGINGAT (dari docs/BACKLOG.md — update tiap kali buka file ini):
 *   - ✅ A1 ringkasan naratif DITUTUP (5 Nov 2026): summary generik dipakai begitu saja —
 *     pengunjung langsung menonton videonya; konteks datang dari judul + tanggal + topik.
 *   - 🟠 [B2] Overlay TOC/daftar isi — sebagai penjelajah konten layak di ±Day 20
 *     (sisi dot-nya sudah beres: dot window + "…" sejak 0.19.0).
 *   - [C1 prerender] [C2 LICENSE] [C3 CI] [C5 debounce] [A2 tanggal+topik] ✅ per 5 Nov 2026.
 *     (A2: recordedAt & topics diisi otomatis dari timestamp judul + hashtag deskripsi video
 *     via oEmbed/scrape utk seluruh Day 1–16 — Day baru WAJIB ikut mengisi dua field ini.)
 *   - Kalau sudah 18 halaman: mulai pertimbangkan B1 (route detail /day/[n]).
 *
 * Untuk menambah Day: cukup tambah entri di bawah (isi day/title/summary/videoId/
 * recordedAt/topics) — dot, badge, dan navigasi menyesuaikan otomatis.
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
	/** Tanggal rekaman (format ISO `YYYY-MM-DD`, WIB) — diambil dari timestamp judul video */
	recordedAt: string;
	/** Topik hari itu — diambil dari hashtag deskripsi video (tanpa '#') */
	topics: string[];
}

export const days: Day[] = [
	{
		day: 1,
		title: 'Perjalanan Eksplorasi IoT — Hari Pertama',
		summary: 'Dokumentasi video hari pertama perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '6G12yiwCpFg',
		recordedAt: '2026-10-01',
		topics: ['arduino', 'esp32'],
	},
	{
		day: 2,
		title: 'Perjalanan Eksplorasi IoT — Hari Kedua',
		summary: 'Dokumentasi video hari kedua perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'ehU_fGVuD50',
		recordedAt: '2026-10-02',
		topics: ['arduino', 'esp32'],
	},
	{
		day: 3,
		title: 'Perjalanan Eksplorasi IoT — Hari Ketiga',
		summary: 'Dokumentasi video hari ketiga perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'mCct-XNHx1o',
		recordedAt: '2026-10-03',
		topics: ['arduino', 'esp32'],
	},
	{
		day: 4,
		title: 'Perjalanan Eksplorasi IoT — Hari Keempat',
		summary: 'Dokumentasi video hari keempat perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'fm0a1ZmxVU0',
		recordedAt: '2026-10-05',
		topics: ['iot', 'esp32'],
	},
	{
		day: 5,
		title: 'Perjalanan Eksplorasi IoT — Hari Kelima',
		summary: 'Dokumentasi video hari kelima perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'hbed7K6AWLA',
		recordedAt: '2026-10-08',
		topics: ['esp32'],
	},
	{
		day: 6,
		title: 'Perjalanan Eksplorasi IoT — Hari Keenam',
		summary: 'Dokumentasi video hari keenam perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'qmFGfv2QJrk',
		recordedAt: '2026-10-10',
		topics: ['esp32'],
	},
	{
		day: 7,
		title: 'Perjalanan Eksplorasi IoT — Hari Ketujuh',
		summary: 'Dokumentasi video hari ketujuh perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '-Otda8b5Ugk',
		recordedAt: '2026-10-12',
		topics: ['esp32'],
	},
	{
		day: 8,
		title: 'Perjalanan Eksplorasi IoT — Hari Kedelapan',
		summary: 'Dokumentasi video hari kedelapan perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'CzAnXtloUj8',
		recordedAt: '2026-10-14',
		topics: ['esp32', 'touch-sensor'],
	},
	{
		day: 9,
		title: 'Perjalanan Eksplorasi IoT — Hari Kesembilan',
		summary: 'Dokumentasi video hari kesembilan perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'q37l42O1FEA',
		recordedAt: '2026-10-15',
		topics: ['esp32'],
	},
	{
		day: 10,
		title: 'Perjalanan Eksplorasi IoT — Hari Kesepuluh',
		summary: 'Dokumentasi video hari kesepuluh perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'bPa67bCf3n0',
		recordedAt: '2026-10-17',
		topics: ['esp32', 'touch-sensor'],
	},
	{
		day: 11,
		title: 'Perjalanan Eksplorasi IoT — Hari Kesebelas',
		summary: 'Dokumentasi video hari kesebelas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '36H-Bevtz1U',
		recordedAt: '2026-10-19',
		topics: ['esp32', 'servo'],
	},
	{
		day: 12,
		title: 'Perjalanan Eksplorasi IoT — Hari Kedua Belas',
		summary: 'Dokumentasi video hari kedua belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'v_uyWLE8Ozg',
		recordedAt: '2026-10-22',
		topics: ['esp32', 'servo', 'sg90'],
	},
	{
		day: 13,
		title: 'Perjalanan Eksplorasi IoT — Hari Ketiga Belas',
		summary: 'Dokumentasi video hari ketiga belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '8GUnCJg8AQQ',
		recordedAt: '2026-10-24',
		topics: ['motor-servo', 'servo', 'sg90'],
	},
	{
		day: 14,
		title: 'Perjalanan Eksplorasi IoT — Hari Keempat Belas',
		summary: 'Dokumentasi video hari keempat belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'DN8sUiD31Ko',
		recordedAt: '2026-10-26',
		topics: ['esp32', 'servo', 'sg90'],
	},
	{
		day: 15,
		title: 'Perjalanan Eksplorasi IoT — Hari Kelima Belas',
		summary: 'Dokumentasi video hari kelima belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: '9QfLGvqpoQU',
		recordedAt: '2026-10-28',
		topics: ['esp32', 'servo', 'sg90'],
	},
	{
		day: 16,
		title: 'Perjalanan Eksplorasi IoT — Hari Keenam Belas',
		summary: 'Dokumentasi video hari keenam belas perjalanan eksplorasi IoT di Hasan\'s IoT Lab.',
		videoId: 'Nwlqmg86_ws',
		recordedAt: '2026-10-30',
		topics: ['esp32', 'motor-servo'],
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

/** Label tanggal rekaman untuk tampilan — ISO `YYYY-MM-DD` → "1 Okt 2026" (WIB) */
export function recordedAtLabel(recordedAt: string): string {
	return new Date(`${recordedAt}T00:00:00+07:00`).toLocaleDateString('id-ID', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'Asia/Jakarta',
	});
}
