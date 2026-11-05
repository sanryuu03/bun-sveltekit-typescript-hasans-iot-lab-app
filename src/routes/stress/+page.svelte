<script lang="ts">
	import Book from '#lib/components/Book.svelte';
	import Badge from '#lib/components/ui/badge/badge.svelte';
	import Button from '#lib/components/ui/button/button.svelte';
	import Separator from '#lib/components/ui/separator/separator.svelte';
	import RiArrowLeftLine from 'remixicon-svelte/icons/arrow-left-line';

	// ==================================================================
	// 🧪 Halaman stress test — alat pengembangan (bukan bagian landing page).
	// Bisa dihapus kapan saja tanpa memengaruhi situs utama (`/`).
	// ==================================================================

	const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

	const SEL = {
		next: '[aria-label="Halaman berikutnya"]',
		prev: '[aria-label="Halaman sebelumnya"]',
		title: '[data-slot="card-title"]',
		dot: (index: number) =>
			`[aria-label="Navigasi halaman (horizontal)"] > div > button:nth-child(${index + 1})`,
	} as const;

	interface Step {
		/** selector, atau "key:<nama-tombol>" untuk simulasi keyboard */
		sel: string;
		delay: number;
		repeats?: number;
	}

	interface ScenarioDef {
		label: string;
		desc: string;
		/** hasil akhir yang diharapkan */
		expect: string;
		/** jeda tambahan setelah reset (ms) — dipakai agar langkah pertama jatuh di luar window animasi 690ms */
		preDelay?: number;
		steps: Step[];
	}

	interface LogEntry {
		label: string;
		finalTitle: string;
		settledCards: number;
		peakCards: number;
		ms: number;
		status: 'PASS' | 'FAIL';
		reason?: string;
	}

	// ---- Metrik live (di-sample otomatis setiap 200ms) ----
	let cardsNow = $state(0);
	let videosNow = $state(0);
	let nodeCount = $state(0);
	let peakCards = $state(0);
	let activeTitle = $state('—');

	$effect(() => {
		const timer = setInterval(() => {
			cardsNow = document.querySelectorAll('[data-slot="card"]').length;
			peakCards = Math.max(peakCards, cardsNow);
			videosNow = document.querySelectorAll('.aspect-video').length;
			nodeCount = document.querySelectorAll('*').length;
			activeTitle = lastTitleShort();
		}, 200);
		return () => clearInterval(timer);
	});

	function lastTitleShort(): string {
		const t = [...document.querySelectorAll(SEL.title)].pop()?.textContent ?? '—';
		return t.replace('Perjalanan Eksplorasi IoT — ', '');
	}

	// ---- Eksekusi skenario ----
	let running = $state(false);
	let runningLabel = $state<string | null>(null);
	const log = $state<LogEntry[]>([]);

	function clickSel(sel: string): boolean {
		if (sel.startsWith('key:')) {
			window.dispatchEvent(new KeyboardEvent('keydown', { key: sel.slice(4) }));
			return true;
		}
		const el = document.querySelector(sel) as HTMLElement | null;
		if (!el) return false;
		el.click();
		return true;
	}

	async function runScenario(def: ScenarioDef) {
		if (running) return;
		running = true;
		runningLabel = def.label;
		peakCards = 0;
		const t0 = performance.now();
		try {
			// reset: pastikan mulai dari Day 1
			clickSel(SEL.dot(0));
			// reset bisa memicu animasi (window 690ms) — dasar 800ms menempatkan langkah pertama di luarnya
			await sleep(800 + (def.preDelay ?? 0));

			for (const step of def.steps) {
				const repeats = step.repeats ?? 1;
				for (let i = 0; i < repeats; i++) {
					if (!clickSel(step.sel)) break; // tombol sudah menghilang (mis. di halaman terakhir)
					if (step.delay) await sleep(step.delay);
				}
			}

			// tunggu animasi & cleanup timer selesai
			await sleep(850);

			const finalTitle = lastTitleShort();
			const settledCards = document.querySelectorAll('[data-slot="card"]').length;
			const expectOk = finalTitle.includes(def.expect);
			const clean = settledCards === 1;
			log.unshift({
				label: def.label,
				finalTitle,
				settledCards,
				peakCards,
				ms: Math.round(performance.now() - t0),
				status: clean && expectOk ? 'PASS' : 'FAIL',
				reason: !clean ? `${settledCards} card tersisa (harus 1 — indikasi elemen bocor)` : !expectOk ? `harusnya "${def.expect}", hasilnya "${finalTitle}"` : undefined,
			});
			if (log.length > 12) log.pop();
		} catch (e) {
			log.unshift({
				label: def.label,
				finalTitle: lastTitleShort(),
				settledCards: document.querySelectorAll('[data-slot="card"]').length,
				peakCards,
				ms: Math.round(performance.now() - t0),
				status: 'FAIL',
				reason: String(e).slice(0, 120),
			});
		} finally {
			running = false;
			runningLabel = null;
		}
	}

	// ---- Definisi skenario ----
	const nt = (n: number, sel: string, delay: number): Step[] =>
		Array.from({ length: n }, () => ({ sel, delay }));

	const alternate = (n: number, a: string, b: string, delay: number): Step[] =>
		Array.from({ length: n }, (_, k) => ({ sel: k % 2 === 0 ? a : b, delay }));

	const scenarioDefs: ScenarioDef[] = [
		{
			label: 'Sweep maju ×5',
			desc: 'Klik next berurutan, 800ms antar klik — semua di luar window animasi 690ms, setiap klik diterima',
			expect: 'Hari Keenam',
			steps: nt(5, SEL.next, 800),
		},
		{
			label: 'Rapid-fire ×20 (0ms)',
			desc: 'Klik next 20× tanpa jeda — hanya klik pertama diterima, sisanya di-debounce oleh guard C5',
			expect: 'Hari Kedua',
			steps: nt(20, SEL.next, 0),
		},
		{
			label: 'Bolak-balik ×12',
			desc: 'Next↔prev berselang 800ms — semua diterima, 6×+1 dan 6×−1 = netto 0',
			expect: 'Hari Pertama',
			steps: alternate(12, SEL.next, SEL.prev, 800),
		},
		{
			label: 'Lompat dot 1→5→1',
			desc: 'Lompatan jauh via dot, 800ms antar lompatan (pasti di luar window animasi)',
			expect: 'Hari Pertama',
			steps: [
				{ sel: SEL.dot(4), delay: 800 },
				{ sel: SEL.dot(0), delay: 800 },
			],
		},
		{
			label: 'Keyboard → ×2',
			desc: 'KeyboardEvent nyata ×2 berselang 500ms — klik kedua masuk window animasi lalu di-debounce',
			expect: 'Hari Kedua',
			preDelay: 200,
			steps: [
				{ sel: 'key:ArrowRight', delay: 500 },
				{ sel: 'key:ArrowRight', delay: 500 },
			],
		},
	];
</script>

<svelte:head>
	<title>Stress Test — Hasan's IoT Lab</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-8 text-foreground">
	<!-- Header -->
	<header class="flex flex-col gap-3">
		<div class="flex items-center justify-between">
			<Button variant="outline" size="sm" href="/">
				<RiArrowLeftLine data-icon="inline-start" />
				Kembali ke landing page
			</Button>
			<Badge variant="outline">Alat pengembangan</Badge>
		</div>
		<div class="text-center">
			<h1 class="text-2xl font-bold tracking-tight">🧪 Stress Test Buku</h1>
			<p class="mt-1 text-sm text-muted-foreground">
				Verifikasi manual: setelah berapa kali pun navigasi, DOM harus tersisa
				<span class="font-semibold text-foreground">tepat 1 card</span> — tidak boleh ada elemen lama yang tertinggal (gelembung).
			</p>
		</div>
	</header>

	<!-- Buku -->
	<section>
		<Book />
	</section>

	<!-- Panel metrik -->
	<section class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<h2 class="text-sm font-semibold">Metrik live</h2>
			<Separator class="flex-1" />
		</div>
		<div class="grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4">
			<div class="rounded-lg border bg-card p-3 text-left">
				<div class="text-muted-foreground">card sekarang</div>
				<div class="mt-1 text-xl font-bold tabular-nums"
					class:text-green-500={cardsNow === 1}
					class:text-red-500={cardsNow > 1}>{cardsNow}</div>
				<div class="mt-0.5 text-[10px] text-muted-foreground">target: 1 (steady)</div>
			</div>
			<div class="rounded-lg border bg-card p-3 text-left">
				<div class="text-muted-foreground">video embed</div>
				<div class="mt-1 text-xl font-bold tabular-nums">{videosNow}</div>
				<div class="mt-0.5 text-[10px] text-muted-foreground">iframe hanya saat diputar</div>
			</div>
			<div class="rounded-lg border bg-card p-3 text-left">
				<div class="text-muted-foreground">total DOM node</div>
				<div class="mt-1 text-xl font-bold tabular-nums">{nodeCount}</div>
				<div class="mt-0.5 text-[10px] text-muted-foreground">tidak boleh tumbuh terus</div>
			</div>
			<div class="rounded-lg border bg-card p-3 text-left">
				<div class="text-muted-foreground">puncak card</div>
				<div class="mt-1 text-xl font-bold tabular-nums"
					class:text-green-500={peakCards <= 2}
					class:text-amber-500={peakCards > 2}>{peakCards}</div>
				<div class="mt-0.5 text-[10px] text-muted-foreground">≤ 2 wajar (aktif + daun keluar)</div>
			</div>
		</div>
		<p class="text-center text-xs text-muted-foreground">
			halaman aktif: <span class="font-mono font-semibold text-foreground">{activeTitle}</span>
		</p>
	</section>

	<!-- Skenario -->
	<section class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<h2 class="text-sm font-semibold">Skenario</h2>
			<Separator class="flex-1" />
		</div>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each scenarioDefs as def (def.label)}
				<button
					type="button"
					class="justify-start rounded-xl border bg-card p-3 text-left transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
					onclick={() => runScenario(def)}
					disabled={running}
				>
					<span class="block text-sm font-semibold">{def.label}</span>
					<span class="mt-0.5 block text-xs text-muted-foreground">{def.desc}</span>
					<span class="mt-1 block font-mono text-[10px] text-muted-foreground">target akhir: {def.expect}</span>
					{#if runningLabel === def.label}
						<span class="mt-1 block animate-pulse text-xs font-semibold text-primary">▶ sedang berjalan…</span>
					{/if}
				</button>
			{/each}
		</div>
		{#if running}
			<p class="animate-pulse text-center text-xs font-semibold text-primary">
				Skenario "{runningLabel}" sedang dieksekusi — jangan tutup halaman…
			</p>
		{/if}
	</section>

	<!-- Log -->
	<section class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<h2 class="text-sm font-semibold">Log hasil</h2>
			<Separator class="flex-1" />
		</div>
		{#if log.length === 0}
			<p class="text-center text-xs text-muted-foreground">Belum ada skenario dijalankan.</p>
		{:else}
			<ul class="flex flex-col gap-2">
				{#each log as entry (entry.label + entry.ms)}
					<li class="flex items-center gap-3 rounded-lg border bg-card px-3 py-2 text-xs">
						<Badge
							class={entry.status === 'PASS' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
						>
							{entry.status}
						</Badge>
						<div class="flex min-w-0 flex-1 flex-col text-left">
							<span class="truncate font-semibold">{entry.label}</span>
							<span class="truncate font-mono text-[10px] text-muted-foreground">
								halaman akhir: {entry.finalTitle} · card: {entry.settledCards} · peak: {entry.peakCards} · {entry.ms}ms
							</span>
							{#if entry.reason}
								<span class="truncate font-mono text-[10px] text-red-500">{entry.reason}</span>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
			<Button variant="ghost" size="sm" class="self-center" onclick={() => log.splice(0)}>
				Hapus log
			</Button>
		{/if}
	</section>

	<p class="pb-4 text-center text-[10px] text-muted-foreground">
		Rute ini hanya utilitas pengujian — aman untuk dihapus atau dibiarkan (tidak diindeks mesin pencari).
		Dokumentasi lengkap: bagian "Stress Test Manual" di README.
	</p>
</main>
