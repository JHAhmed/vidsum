<script>
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';
	import { marked } from 'marked';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();

	async function handleDelete() {

		try {
			const response = await fetch('/api/delete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: data.id })
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}
			const res = await response.json();

			goto('/saved');	

		} catch (err) {
			console.error('Error fetching summary:', err);
		} 
	}
</script>

<article class="container mx-auto max-w-6xl px-6 py-8">
	<header animate-in use:animateIn={{ blur: 2, y: 5, delay: 0.4 }} class="section mb-8">
		<h1
			class="mb-6 text-3xl leading-tight tracking-tighter text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
		>
			{data.title}
		</h1>

		<!-- <p class="text-md text-gray-800 lg:text-lg dark:text-gray-400">
			<span class="text-black dark:text-white">Jamal Haneef</span> <span class="mx-2">•</span>
			{post.date}
		</p> -->
	</header>

	<div
		animate-in
		use:animateIn={{ blur: 2, y: 5, delay: 0.6 }}
		class=" prose lg:prose-lg dark:prose-invert max-w-none"
	>
		{@html marked.parse(data.content)}
	</div>

	<button
		onclick={handleDelete}
		animate-in
		use:animateIn={{ delay: 0.1, blur: 2, delay: 0.8 }}
		class="my-4 flex flex items-center justify-center cursor-pointer p-2 px-3 rounded-xl bg-red-400 text-black hover:bg-red-500 dark:text-white"
	>
	Delete
		<span class="flex size-5 items-center justify-center md:size-6">
			<Icon icon="heroicons:trash" />
		</span>
	</button>
</article>
