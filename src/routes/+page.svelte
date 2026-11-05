<script lang="ts">
	import RiBookOpenLine from 'remixicon-svelte/icons/book-open-line';
	import RiCpuLine from 'remixicon-svelte/icons/cpu-line';
	import RiGithubLine from 'remixicon-svelte/icons/github-line';
	import RiYoutubeLine from 'remixicon-svelte/icons/youtube-line';
	import Book from '#lib/components/Book.svelte';
	import { days, playlistUrl } from '#lib/data/days';
	import Badge from '#lib/components/ui/badge/badge.svelte';
	import Button from '#lib/components/ui/button/button.svelte';
	import Separator from '#lib/components/ui/separator/separator.svelte';
</script>

<svelte:head>
	<title>Hasan's IoT Lab — Jurnal Eksplorasi IoT</title>
	<meta
		name="description"
		content="Jurnal eksplorasi IoT dalam bentuk buku interaktif — halaman per hari berisi dokumentasi video perjalanan eksperimen."
	/>
</svelte:head>

<div class="relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
	<!-- Latar ambient -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0">
		<div class="absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"></div>
		<div class="absolute -right-20 bottom-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-3xl"></div>
	</div>

	<header class="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3.5 sm:py-5">
		<div class="flex items-center gap-2.5 text-left">
			<span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
				<RiCpuLine class="size-5" />
			</span>
			<span class="flex flex-col gap-0">
				<span class="text-sm font-semibold leading-tight tracking-tight">Hasan's IoT Lab</span>
				<span class="text-xs leading-tight text-muted-foreground">Ruang eksperimen IoT</span>
			</span>
		</div>
		<Button
			variant="outline"
			size="sm"
			href="https://github.com/sanryuu03/bun-sveltekit-typescript-hasans-iot-lab-app"
			target="_blank"
			rel="noopener noreferrer"
		>
			<RiGithubLine data-icon="inline-start" />
			<span class="hidden sm:inline">GitHub</span>
		</Button>
	</header>

	<main class="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-6 text-center">
		<Badge variant="outline" class="mb-3 gap-1.5 rounded-full px-3 py-1 shadow-sm">
			<RiBookOpenLine class="size-3.5" />
			Jurnal Eksplorasi · {days.length} Hari
		</Badge>
		<h1 class="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
			Perjalanan Eksplorasi IoT
		</h1>
		<p class="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
			{days.length} halaman album berisi dokumentasi video perjalanan eksperimen IoT. Klik tepi kanan buku
			untuk lanjut, tepi kiri untuk kembali — atau pilih dot di sisi kanan untuk lompat ke halaman
			tentu.
		</p>

		<div class="mt-5 flex w-full justify-center sm:mt-10">
			<Book />
		</div>
	</main>

	<footer class="relative z-10 border-t border-border/50 bg-background/60 backdrop-blur-sm">
		<div class="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-muted-foreground sm:flex-row">
			<p>© {new Date().getFullYear()} Hasan's IoT Lab · Dibangun dengan SvelteKit, Tailwind CSS & shadcn-svelte</p>
			<div class="flex items-center gap-2">
				<Button variant="ghost" size="icon-xs" href="https://github.com/sanryuu03/bun-sveltekit-typescript-hasans-iot-lab-app" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<RiGithubLine class="size-3.5" />
				</Button>
				<Separator orientation="vertical" class="h-4" />
				<!-- A3 (docs/BACKLOG.md): playlist lengkap semua Day — tarik dari days.ts -->
				<a
					href={playlistUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 underline-offset-2 transition-colors hover:text-foreground"
					aria-label="Playlist lengkap semua Day di YouTube"
				>
					<RiYoutubeLine class="size-3.5" />
					Playlist lengkap · Day 1–{days.length}
				</a>
				<Separator orientation="vertical" class="h-4" />
				<span>FullStackWith Hasan</span>
			</div>
		</div>
	</footer>
</div>
