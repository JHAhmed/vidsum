<script>
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';
	import { marked } from 'marked';
	import katex from 'katex';
	import markedKatex from 'marked-katex-extension'; // Import the extension
	import 'katex/dist/katex.min.css'; // Import KaTeX CSS
	import { goto } from '$app/navigation';
	import { AlertDialog } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import { Toaster, toast } from 'svelte-sonner';

	let { data } = $props();

	// Configure marked with KaTeX extension
	marked.use(
		markedKatex({
			throwOnError: false,
			displayMode: false,
			output: 'html'
		})
	);

	async function copySummary() {
		try {
			await navigator.clipboard.writeText(data.content);
			toast.success('Summary copied to clipboard!');
		} catch (err) {
			console.error('Error copying summary:', err);
			toast.error('Failed to copy summary. Check the console.');
		}
	}

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

			goto('/app/saved');
		} catch (err) {
			console.error('Error fetching summary:', err);
		}
	}
</script>

<svelte:head></svelte:head>

<Toaster richColors closeButton />

<article class="container mx-auto max-w-5xl px-6 py-8">
	<header animate-in use:animateIn={{ blur: 2, y: 5, delay: 0.4 }} class="section mb-8">
		<div class="flex items-center justify-between">
			<h1
				class="mb-6 text-3xl leading-tight tracking-tighter text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
			>
				{data.title}
			</h1>

			<div class="grow"></div>

			<button
			onclick={copySummary}
				class="mr-2 flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-2 px-3 text-black hover:bg-green-300 dark:bg-gray-800 dark:text-white dark:hover:bg-green-300"
			>
				<Icon icon="heroicons:clipboard" />
			</button>

			<AlertDialog.Root>
				<AlertDialog.Trigger
					class="flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-2 px-3 text-black hover:bg-red-400 dark:bg-gray-800 dark:text-white dark:hover:bg-red-400"
				>
					<Icon icon="heroicons:trash" />
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/50 " />

					<AlertDialog.Content
						preventScroll={false}
						interactOutsideBehavior="close"
						class="fixed top-1/2 left-1/2 z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-gray-100 p-6  shadow-lg  dark:bg-slate-800"
					>
						<AlertDialog.Title class="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Do you really want to delete?
						</AlertDialog.Title>
						<AlertDialog.Description class="mt-2 text-sm text-gray-500 dark:text-gray-400">
							This action cannot be undone. Are you sure you want to continue?
						</AlertDialog.Description>
						<div class="mt-4 flex justify-end gap-2">
							<AlertDialog.Cancel
								class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none  dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							>
								Cancel
							</AlertDialog.Cancel>
							<AlertDialog.Action
								onclick={handleDelete}
								class="inline-flex cursor-pointer items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:ring-1 focus:ring-red-500 focus:outline-none  dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-600"
							>
								Delete
							</AlertDialog.Action>
						</div>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</div>
	</header>

	<div
		animate-in
		use:animateIn={{ blur: 2, y: 5, delay: 0.6 }}
		class="prose lg:prose-lg dark:prose-invert max-w-none"
	>
		{@html marked.parse(data.content)}
	</div>
</article>
