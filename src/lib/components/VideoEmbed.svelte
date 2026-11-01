<script lang="ts">
	import RiPlayFill from 'remixicon-svelte/icons/play-fill';
	import { thumbnailUrl } from '#lib/data/days';

	let {
		videoId,
		title,
	}: {
		videoId: string;
		title: string;
	} = $props();

	/** Video (iframe) baru dimuat setelah tombol play diklik — hemat bandwidth */
	let playing = $state(false);
</script>

<div class="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-foreground/10 shadow-sm">
	{#if playing}
		<iframe
			src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
			title={title}
			class="absolute inset-0 h-full w-full"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	{:else}
		<button
			type="button"
			class="group absolute inset-0 flex items-center justify-center"
			onclick={() => (playing = true)}
			aria-label={`Putar video: ${title}`}
		>
			<img
				src={thumbnailUrl(videoId)}
				alt={title}
				class="absolute inset-0 h-full w-full object-cover"
				loading="lazy"
			/>
			<span
				aria-hidden="true"
				class="absolute inset-0 bg-black/30 transition group-hover:bg-black/15"
			></span>
			<span
				aria-hidden="true"
				class="relative flex size-12 items-center justify-center rounded-full bg-background/95 shadow-lg transition group-hover:scale-110"
			>
				<RiPlayFill class="size-5 translate-x-0.5 text-foreground" />
			</span>
		</button>
	{/if}
</div>
