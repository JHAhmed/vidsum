<script>
	import '../app.css';
	import { Navbar } from '$shared';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
	let isDark = $state(false);

	// Initialize from localStorage and system preferences
	onMount(() => {
		if (browser) {
			// Check localStorage first
			if (localStorage.getItem('theme') === 'dark') {
				isDark = true;
			} else if (!localStorage.getItem('theme')) {
				// If no preference is saved, check system preference
				isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
		}
	});

	// Function to toggle dark mode
	function toggleDarkMode() {
		isDark = !isDark;
		if (browser) {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		}
	}
</script>

<svelte:head>
	<title>VidSum | Easy Notes & Video Summary</title>
	<meta
		name="description"
		content="Summarize videos using AI. Paste a YouTube URL and get a summary in seconds."
	/>
	<meta name="robots" content="index, follow" />
	
	<!-- <link rel="canonical" href="https://jamalhaneef.vercel.app" /> -->
	<meta property="og:title" content="VidSum | Easy Notes & Video Summary" />
	<meta property="og:description" content="Summarize videos using AI. Paste a YouTube URL and get a summary in seconds." />
	<!-- <meta property="og:image" content="https://jamalhaneef.vercel.app/ogimage.png" /> -->
	<meta property="og:type" content="website" />
	<!-- <meta property="og:url" content="https://jamalhaneef.vercel.app" /> -->
</svelte:head>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
	<filter id="noise">
		<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="9" stitchTiles="stitch" />
		<feColorMatrix type="saturate" values="0" />
		<feBlend in="SourceGraphic" mode="overlay" />
	</filter>
</svg>

<!-- <div
	class="{isDark
		? 'dark'
		: ''} flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950"
>
	<div class="py-12">
		{#key $page.url.pathname}
			<Navbar
				{isDark}
				onToggle={toggleDarkMode}
			/>
		{/key}
	</div>
	{@render children()}
</div> -->

<div class="relative min-h-screen bg-gray-100 dark:bg-gray-950">
	<div class="absolute inset-0 z-0" style="filter: url(#noise); opacity: 0.1;"></div>

	<div
		class="{isDark
			? 'dark'
			: ''} z-20 flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950"
	>
		<div class="py-12">
			{#key $page.url.pathname}
				<Navbar {isDark} onToggle={toggleDarkMode} />
			{/key}
		</div>
		{@render children()}
	</div>
</div>
