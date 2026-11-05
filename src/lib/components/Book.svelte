<script lang="ts">
	import RiArrowLeftSLine from 'remixicon-svelte/icons/arrow-left-s-line';
	import RiArrowRightSLine from 'remixicon-svelte/icons/arrow-right-s-line';
	import RiPlayLine from 'remixicon-svelte/icons/play-line';

	import TooltipRoot from '#lib/components/ui/tooltip/tooltip.svelte';
	import TooltipTrigger from '#lib/components/ui/tooltip/tooltip-trigger.svelte';
	import TooltipContent from '#lib/components/ui/tooltip/tooltip-content.svelte';
	import Badge from '#lib/components/ui/badge/badge.svelte';
	import Button from '#lib/components/ui/button/button.svelte';
	import Card from '#lib/components/ui/card/card.svelte';
	import CardAction from '#lib/components/ui/card/card-action.svelte';
	import CardContent from '#lib/components/ui/card/card-content.svelte';
	import CardDescription from '#lib/components/ui/card/card-description.svelte';
	import CardFooter from '#lib/components/ui/card/card-footer.svelte';
	import CardHeader from '#lib/components/ui/card/card-header.svelte';
	import CardTitle from '#lib/components/ui/card/card-title.svelte';

	import VideoEmbed from './VideoEmbed.svelte';
	import { days, watchUrl, recordedAtLabel, type Day } from '#lib/data/days';

	/** Halaman-halaman buku; default: data jurnal 5 hari */
	let { pages = days }: { pages?: Day[] } = $props();

	let current = $state(0);
	/** Arah balik halaman: 1 = maju, -1 = mundur */
	let dir = $state(1);

	const total = $derived(pages.length);
	const atFirst = $derived(current === 0);
	const atLast = $derived(current >= total - 1);
	const active = $derived(pages[current]);

	/** Halaman lama yang sedang dianimasikan keluar (di-rem manual setelah animasi selesai) */
	let leaving: Day | null = $state(null);
	let leavingTimer: ReturnType<typeof setTimeout> | undefined;

	const ANIM_MS = 640;

	/** C5 (docs/BACKLOG.md): selama animasi keluar berjalan, abaikan input navigasi baru
	 *  — mencegah animasi terpotong di tengah (stress test tetap jadi pemeriksa utama). */
	const animating = $derived(leaving !== null);

	function clampIndex(index: number): number {
		return Math.max(0, Math.min(total - 1, index));
	}

	function commit(target: number) {
		if (animating) return; // guard debounce: jangan potong animasi yang sedang berjalan
		dir = target > current ? 1 : -1;
		// halaman lama jadi "daun keluar", dihapus dari DOM setelah animasi selesai
		leaving = pages[current];
		current = clampIndex(target);
		clearTimeout(leavingTimer);
		leavingTimer = setTimeout(() => (leaving = null), ANIM_MS + 50);
	}

	function goTo(index: number) {
		const target = clampIndex(index);
		if (target !== current) commit(target);
	}

	function next(): void {
		if (!atLast) commit(current + 1);
	}

	function prev(): void {
		if (!atFirst) commit(current - 1);
	}

	async function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') next();
		else if (event.key === 'ArrowLeft') prev();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="@container relative mx-auto w-[min(92vw,660px)] select-none" aria-label="Jurnal perjalanan">
	<!-- ---
	Dot navigasi (1 dot per halaman) — vertikal di sisi kanan buku (desktop).
	--- -->
	<nav class="absolute top-1/2 -right-12 z-30 hidden -translate-y-1/2 flex-col items-center gap-2.5 md:flex" aria-label="Navigasi halaman">
		{#each pages as page, index (page.day)}
			<TooltipRoot>
				<TooltipTrigger onclick={() => goTo(index)}>
					<span
						aria-hidden="true"
						class="block rounded-full transition-all duration-300 size-1.5
							{index === current ? 'w-3 h-3 bg-primary' : 'bg-foreground/25 hover:bg-foreground/60'}"
					></span>
				</TooltipTrigger>
				<TooltipContent side="right">Day {page.day}</TooltipContent>
			</TooltipRoot>
		{/each}
	</nav>

	<!-- ---
	Buku — area 3D untuk animasi balik halaman.
	Halaman aktif di-render via {#key}; halaman lama dipinjam sebagai
	"daun keluar" selama animasi lalu dihapus dari DOM.
	--- -->
	<div
		class="relative [perspective:1800px] rounded-2xl
			shadow-[0_35px_80px_-20px_rgba(0,0,0,0.55)]"
	>
		<!-- Ketebalan tumpukan halaman di tepi kanan (ilusi buku) -->
		<div aria-hidden="true" class="absolute inset-y-3 -right-1.5 w-2 rounded-r-md bg-card/70 ring-1 ring-foreground/10"></div>
		<div aria-hidden="true" class="absolute inset-y-5 -right-3 w-2 rounded-r-md bg-card/40 ring-1 ring-foreground/10"></div>

		<div class="relative grid">
			<!-- Halaman aktif: mundur = daun yang melipat masuk, maju = reveal di bawah -->
			{#key current}
				<div
					class="relative col-start-1 row-start-1 [transform-style:preserve-3d]
						{dir < 0 ? 'anim-leaf-in z-20' : 'anim-reveal'}"
				>
					{@render pageCard(active)}
					<!-- Bayangan punggung buku (spine) -->
					<div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 w-5 rounded-l-[0.35rem] bg-gradient-to-r from-black/20 via-black/5 to-transparent"></div>
				</div>
			{/key}

			<!-- Halaman lama (hanya selama animasi): maju = daun melipat menjauh, mundur = fade -->
			{#if leaving}
				<div
					class="relative col-start-1 row-start-1 [transform-style:preserve-3d]
						{dir > 0 ? 'anim-leaf-out z-20' : 'anim-fade-old'}"
				>
					{@render pageCard(leaving)}
				</div>
			{/if}

			<!-- ---
			Zona klik: tepi KIRI = halaman sebelumnya, tepi KANAN = halaman berikutnya.
			Hanya area tepi yang aktif, agar klik tengah tetap diberikan ke video.
			--- -->
			{#if !atFirst}
				<button
					type="button"
					class="group/prev absolute inset-y-0 left-0 z-30 flex w-9 items-center justify-start rounded-l-[0.35rem] pl-1
						hover:bg-gradient-to-r hover:from-black/10 hover:to-transparent transition-colors"
					onclick={prev}
					aria-label="Halaman sebelumnya"
				>
					<span aria-hidden="true" class="flex size-7 items-center justify-center rounded-full bg-background/80 opacity-0 shadow transition-opacity group-hover/prev:opacity-100">
						<RiArrowLeftSLine class="size-4 text-foreground" />
					</span>
				</button>
			{/if}

			{#if !atLast}
				<button
					type="button"
					class="group/next absolute inset-y-0 right-0 z-30 flex w-9 items-center justify-end rounded-r-[1.4rem] pr-1
						hover:bg-gradient-to-l hover:from-black/10 hover:to-transparent transition-colors"
					onclick={next}
					aria-label="Halaman berikutnya"
				>
					<span aria-hidden="true" class="flex size-7 items-center justify-center rounded-full bg-background/80 opacity-0 shadow transition-opacity group-hover/next:opacity-100">
						<RiArrowRightSLine class="size-4 text-foreground" />
					</span>
				</button>
			{/if}
		</div>
	</div>

	<!-- ---
	Kontrol mobile (di bawah buku): dot horizontal + tombol prev/next.
	Di layar md ke atas, dot vertikal di sisi buku yang berperan.
	--- -->
	<nav
		class="mt-5 flex items-center justify-center gap-2 md:hidden"
		aria-label="Navigasi halaman (horizontal)"
	>
		<Button
			variant="outline"
			size="icon-sm"
			onclick={prev}
			disabled={atFirst}
			aria-label="Halaman sebelumnya"
		>
			<RiArrowLeftSLine />
		</Button>

		<div class="flex items-center gap-2.5 px-1">
			{#each pages as page, index (page.day)}
				<button
					type="button"
					class="flex size-4 items-center justify-center"
					onclick={() => goTo(index)}
					aria-label={`Ke halaman Day ${page.day}`}
					aria-current={index === current ? 'page' : undefined}
				>
					<span
						aria-hidden="true"
						class="block rounded-full transition-all duration-300 size-1.5
							{index === current ? 'w-3 h-3 bg-primary' : 'bg-foreground/25'}"
					></span>
				</button>
			{/each}
		</div>

		<Button
			variant="outline"
			size="icon-sm"
			onclick={next}
			disabled={atLast}
			aria-label="Halaman berikutnya"
		>
			<RiArrowRightSLine />
		</Button>
	</nav>

	<p
		class="mt-3 text-center text-xs text-muted-foreground sm:hidden"
		aria-hidden="true"
	>
		Ketuk tepi kanan buku untuk maju, tepi kiri untuk kembali
	</p>
</section>

{#snippet pageCard(page: Day)}
	<Card
		class="w-full flex flex-col gap-0 overflow-visible rounded-l-[0.35rem] rounded-r-[1.4rem]
			border-0 ring-1 ring-foreground/10 shadow-none bg-card py-0"
	>
		<CardHeader class="px-5 pt-5 pb-2.5 text-left sm:px-6 @2xl:pt-6">
			<CardAction class="flex items-center gap-2">
				<Badge class="font-semibold tracking-wide tabular-nums">Day {String(page.day).padStart(2, '0')}</Badge>
			</CardAction>
			<CardTitle class="pr-2 text-lg leading-snug sm:text-xl @2xl:text-2xl">{page.title}</CardTitle>
			<CardDescription class="line-clamp-2 max-w-prose">{page.summary}</CardDescription>
			<!-- A2 (docs/BACKLOG.md): metrik konten — tanggal rekaman + topik dari deskripsi video -->
			<div class="mt-2 flex flex-wrap items-center gap-1.5">
				<span class="text-xs text-muted-foreground tabular-nums">🗓 {recordedAtLabel(page.recordedAt)}</span>
				{#each page.topics as topic (topic)}
					<Badge variant="outline" class="rounded-full px-2 py-0 text-[11px] font-normal text-muted-foreground">
						{topic}
					</Badge>
				{/each}
			</div>
		</CardHeader>

		<CardContent class="flex items-center justify-center px-5 py-0 sm:px-6">
			<VideoEmbed videoId={page.videoId} title={page.title} />
		</CardContent>

		<CardFooter class="justify-between px-5 py-3.5 sm:px-6 sm:py-5">
			<Button variant="outline" size="sm" href={watchUrl(page.videoId)} target="_blank" rel="noopener noreferrer">
				<RiPlayLine data-icon="inline-start" />
				Tonton di YouTube
			</Button>
			<span aria-hidden="true" class="pr-1 text-sm italic text-muted-foreground tabular-nums">
				— hal. {page.day} —
			</span>
		</CardFooter>
	</Card>
{/snippet}

<style>
	/* Animasi balik halaman — CSS murni, tanpa sistem transition Svelte
	   (sistem transisi terbukti meninggalkan elemen lama di DOM pada versi ini) */

	/* Daun yang melipat menjauh ke kiri (outro saat maju) */
	.anim-leaf-out {
		transform-origin: left center;
		backface-visibility: hidden;
		box-shadow: -28px 0 48px rgb(0 0 0 / 0.3);
		animation: iot-leaf 640ms cubic-bezier(0.24, 0.7, 0.35, 1) forwards;
	}

	/* Daun yang datang terlipat dari kiri (intro saat mundur) */
	.anim-leaf-in {
		transform-origin: left center;
		backface-visibility: hidden;
		box-shadow: -28px 0 48px rgb(0 0 0 / 0.3);
		animation: iot-leaf 640ms cubic-bezier(0.24, 0.7, 0.35, 1) reverse forwards;
	}

	@keyframes iot-leaf {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(-105deg);
		}
	}

	/* Halaman baru yang muncul di bawah daun (maju) */
	.anim-reveal {
		animation: iot-reveal 640ms ease-out both;
	}
	@keyframes iot-reveal {
		from {
			opacity: 0.55;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Halaman lama memudar di bawah daun (mundur) */
	.anim-fade-old {
		animation: iot-fade-old 640ms ease-out forwards;
	}
	@keyframes iot-fade-old {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
