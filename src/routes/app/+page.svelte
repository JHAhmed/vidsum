<script>
	import { Tabs, Switch, Input } from '$components';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { animateIn } from '$lib';
	import { shared } from '$lib/state.svelte';

	import MarkdownIt from 'markdown-it';
	import mdKatex from '@iktakahiro/markdown-it-katex';

	const md = new MarkdownIt({
		html: true, // Allow HTML tags in source
		linkify: true, // Autoconvert URL-like text to links
		typographer: true // Enable smartquotes, etc.
	}).use(mdKatex); // Use KaTeX for math

	let title = $state('');
	let youtubeUrl = $state('');
	let point = $state('');
	let pointsList = $state([]);
	let numSegments = $state(2);
	let summaryLength = $state('short');
	let summaryType = $state('education');

	let summary = $state('');
	let transcript = $state('');

	let isLoading = $state(false);
	let errorMessage = $state('');

	let examplePoints = $state([
		'Highlight important points',
		'Use LaTeX formatting to explain concepts',
		'Stick to the concepts mentioned',
		'Simplify the concepts a bit',
		'Use examples to help me understand it better',
	]);

	function handleKeydown(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			event.preventDefault(); // Prevent form submission
			addTag();
		}
	}

	function addTag() {
		if (point.trim() !== '') {
			pointsList = [...pointsList, point.trim()];
			point = ''; // Clear the input field
		}
	}

	async function handleSubmit(e) {
		e.preventDefault(); // Prevent default form submission

		if (!youtubeUrl.trim()) {
			errorMessage = 'Please paste a YouTube URL.';
			return;
		}

		isLoading = true;
		errorMessage = '';
		summary = ''; // Clear previous summary

		try {
			const response = await fetch('/api/summarize', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					url: youtubeUrl,
					segments: numSegments,
					length: summaryLength,
					type: summaryType,
					points: pointsList
				})
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			summary = data.summary; // Keep it as raw string, marked.parse is used in template
			transcript = data.captions; // Keep it as raw string, marked.parse is used in template
		} catch (err) {
			console.error('Error fetching summary:', err);
			errorMessage = err.message || 'Failed to generate summary. Check the console.';
		} finally {
			isLoading = false;
		} // This isLoading = false was redundant here as it's in the finally block
	}

	async function saveSummary() {
		if (!title.trim()) {
			toast.error('Please enter a title for your note.');
			errorMessage = 'A title is required to save the summary.'; // Also show message in the dedicated error area
			return;
		}
		errorMessage = ''; // Clear previous error messages

		try {
			const response = await fetch('/api/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: title,
					content: summary,
					url: youtubeUrl,
					transcript: transcript
				})
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			const data = await response.json(); // Assuming data.supabaseResult.id exists and is valid
			if (data.supabaseResult && data.supabaseResult.id) {
				// goto(`/saved/${data.supabaseResult.id}`);

				// toast.success("Summary saved successfully!");

				toast('Summary saved successfully!', {
					action: {
						label: 'View',
						onClick: () => goto(`/app/saved/${data.supabaseResult.id}`)
					}
				});
			} else {
				throw new Error('Failed to get ID from save response.');
			}
		} catch (err) {
			console.error('Error saving summary:', err);
			errorMessage = err.message || 'Failed to save summary. Check the console.';
			toast.error(errorMessage);
		}
	}
</script>

<Toaster richColors closeButton />

<svelte:head>
	<title>VidSum | Easy Notes & Video Summary</title>
	<meta
		name="description"
		content="Summarize videos using AI. Paste a YouTube URL and get a summary in seconds."
	/>
	<link rel="canonical" href="https://vidsum-one.vercel.app/" />
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebSite",
			"name": "VidSum",
			"url": "https://vidsum-one.vercel.app/"
		}
	</script>

	<meta property="og:title" content="VidSum | Easy Notes & Video Summary" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://vidsum-one.vercel.app/ogimage.png" />
	<meta property="og:image:alt" content="VidSum - Summarize videos using AI" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://vidsum-one.vercel.app/" />

	<meta
		property="og:description"
		content="Summarize videos using AI. Paste a YouTube URL and get a summary in seconds."
	/>
</svelte:head>

<div class="flex flex-col items-center justify-center">
	<div
		class="mx-12 mt-16 w-full max-w-6xl space-y-8 rounded-xl bg-gray-100 p-4 py-8 shadow-xl backdrop-blur-md sm:p-6 md:p-10 dark:bg-slate-900 dark:shadow-slate-800/20"
	>
		<header class="text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-gray-50">VidSum</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400">Paste a YouTube link, get a summary!</p>
		</header>
		<form onsubmit={handleSubmit} class="space-y-6">
			<Input
				bind:value={youtubeUrl}
				label="YouTube Video URL"
				placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			/>

			<div
				class="my-6 flex w-full flex-col space-y-4 sm:flex-row sm:space-x-2 md:space-y-0 md:space-x-4"
			>
				<div class="w-full">
					<Tabs
						onValueChange={(newValue) => (summaryLength = newValue)}
						value={summaryLength}
						label="Summary Length"
						tabs={{
							short: 'Short',
							medium: 'Medium',
							long: 'Long'
						}}
					/>
				</div>

				<div class="w-full">
					<Tabs
						onValueChange={(newValue) => (summaryType = newValue)}
						value={summaryType}
						label="Video Type"
						tabs={{
							education: 'Education',
							entertainment: 'Entertainment',
							others: 'Others'
						}}
					/>
				</div>
			</div>

			<div class="mt-2 hidden flex-wrap items-center gap-2 md:flex">
				{#each examplePoints as point, i}
					<button
						type="button"
						onclick={() => {
							pointsList = [...pointsList, point];
							examplePoints.splice(i, 1);
						}}
						class="cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-slate-800 dark:text-slate-300"
					>
						{point}
					</button>
				{/each}
			</div>

			<Input
				bind:value={point}
				label="Points To Include"
				type="text"
				onkeydown={handleKeydown}
				required={false}
				placeholder="e.g., jdk, javac, (or) custom instructions"
			/>

			{#if pointsList.length > 0}
				<div class="mt-2 flex flex-wrap items-center gap-2">
					{#each pointsList as point, i}
						<div
							class="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-slate-800 dark:text-slate-300"
						>
							{point}
							<button
								type="button"
								class="text-white-500 cursor-pointer"
								onclick={() => pointsList.splice(i, 1)}
							>
								<Icon icon="ph:x-bold" class="inline-flex size-3" />
							</button>
						</div>
					{/each}
				</div>
			{/if}

			<Input
				bind:value={title}
				label="Note Title"
				placeholder="e.g., Java Week 1 Insights"
				autocomplete="on"
				type="text"
			/>

			<button
				type="submit"
				disabled={isLoading}
				class="flex w-full transform cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:from-sky-600 hover:to-cyan-600 hover:shadow-lg focus:ring-4 focus:ring-sky-500/50 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
			>
				{#if isLoading}
					<Icon icon="line-md:loading-twotone-loop" class="mr-2 h-5 w-5 animate-spin" />
					<span>Summarizing...</span>
				{:else}
					<Icon icon="ph:magic-wand-duotone" class="mr-2 h-5 w-5" /> <span>Get Summary</span>
				{/if}
			</button>
		</form>

		{#if errorMessage}
			<div
				class="mt-6 rounded-lg border border-red-600 bg-red-500/10 p-4 text-sm text-red-700 dark:border-red-500 dark:bg-red-900/30 dark:text-red-300"
				role="alert"
			>
				<p>{@html errorMessage}</p>
			</div>
		{/if}

		{#if summary && !isLoading}
			<section class="my-4 space-y-6">
				<div class="rounded-lg bg-gray-50 p-4 shadow sm:p-6 dark:bg-slate-800/50">
					<h2 class="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
						{title || 'Summary'}
					</h2>
					<div
						class="prose prose-sm sm:prose-base prose-slate dark:prose-invert dark:prose-p:text-slate-300 dark:prose-headings:text-slate-100 max-w-none leading-relaxed"
					>
						{@html md.render(summary)}
					</div>
				</div>

				{#if shared.isLoggedIn}
					<button
						onclick={saveSummary}
						type="button"
						class="flex w-full transform cursor-pointer items-center justify-center space-x-2 rounded-lg bg-green-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-green-600 hover:shadow-lg focus:ring-4 focus:ring-green-500/50 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
					>
						<Icon icon="ph:floppy-disk-duotone" class="mr-2 h-5 w-5" /> Save Summary
					</button>
				{:else}
					<a
						href="/auth/"
						type="button"
						class="flex w-full transform cursor-pointer items-center justify-center space-x-2 rounded-lg bg-green-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-green-600 hover:shadow-lg focus:ring-4 focus:ring-green-500/50 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
					>
						<Icon icon="ph:floppy-disk-duotone" class="mr-2 h-5 w-5" /> Log In to Save
					</a>
				{/if}
			</section>
		{/if}
	</div>
</div>
<footer class="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
	<p>© {new Date().getFullYear()} VidSum by Jamal Haneef. Keep innovating!</p>
</footer>
