<script>
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';
	import { goto } from '$app/navigation';
	import { AlertDialog } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import { Toaster, toast } from 'svelte-sonner';

	import MarkdownIt from 'markdown-it';
	import mdKatex from '@iktakahiro/markdown-it-katex';

	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css';

	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: true
	}).use(mdKatex);

	let { data } = $props();

	let editableData = $state(data);
	let processedContent = $state('');
	let isEditing = $state(false);
	let editableContent = $state('');

	const carta = new Carta({
		// theme: 'github-light'
	});

	async function processMarkdownContent(markdownString) {
		if (!markdownString) return '';
		try {
			const htmlContent = md.render(markdownString);
			return htmlContent;
		} catch (error) {
			console.error('Error compiling Markdown with markdown-it:', error);
			return `<p>Error rendering content: ${error.message}</p>`;
		}
	}

	$effect(() => {
		if (editableData && editableData.content) {
			processMarkdownContent(editableData.content).then((html) => {
				processedContent = html;
			});
		} else {
			processedContent = '';
		}
	});

	function handleEdit() {
		editableContent = editableData.content;
		isEditing = true;
	}

	async function handleSaveEdit() {
		editableData.content = editableContent;
		isEditing = false;

		try {
			const response = await fetch('/api/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: editableData.id, content: editableContent })
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}
			await response.json(); 
			toast.success('Content saved successfully!');
		} catch (err) {
			console.error('Error saving content:', err);
			toast.error(err.message || 'Failed to save content.');
		}
	}

	function handleCancelEdit() {
		isEditing = false;
	}

	async function copySummary() {
		try {
			await navigator.clipboard.writeText(editableData.content);
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
				body: JSON.stringify({ id: editableData.id })
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}
			await response.json();
			goto('/app/saved');
		} catch (err) {
			console.error('Error deleting summary:', err);
			toast.error(err.message || 'Failed to delete summary.');
		}
	}
</script>

<Toaster richColors closeButton />

<svelte:head>
	<title>{editableData.title} | VidSum</title>
	<meta name="description" content="View and edit your saved summary." />
	<meta property="og:title" content={editableData.title} />
	<meta property="og:description" content="View and edit your saved summary." />
	<meta property="og:type" content="article" />
	<!-- <meta property="og:image" content="/images/summary.png" /> -->
</svelte:head>

<article class="container mx-auto max-w-5xl px-6 py-8 mt-16">
	<header animate-in use:animateIn={{ blur: 2, y: 5, delay: 0.4 }} class="section mb-8">
		<div class="flex items-center justify-between">
			<h1
				class="mb-6 text-3xl leading-tight tracking-tighter text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
			>
				{editableData.title}
			</h1>

			{#if !isEditing}
				<div class="grow"></div>
				<button
					onclick={handleEdit}
					class="mr-2 flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-2 px-3 text-black hover:bg-slate-300 dark:bg-gray-800 dark:text-white dark:hover:bg-slate-500"
					title="Edit Content"
				>
					<Icon icon="heroicons:pencil-square" />
				</button>

				<button
					onclick={copySummary}
					class="mr-2 flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-2 px-3 text-black hover:bg-gray-300 hover:text-black dark:bg-gray-800 dark:text-white dark:hover:bg-gray-100"
					title="Copy Markdown"
				>
					<Icon icon="heroicons:clipboard" />
				</button>

				<AlertDialog.Root>
					<AlertDialog.Trigger
						class="flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-2 px-3 text-black hover:bg-red-300 dark:bg-gray-800 dark:text-white dark:hover:bg-red-400"
						title="Delete Content"
					>
						<Icon icon="heroicons:trash" />
					</AlertDialog.Trigger>
					<AlertDialog.Portal>
						<AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/50 " />
						<AlertDialog.Content
							preventScroll={false}
							interactOutsideBehavior="close"
							class="fixed top-1/2 left-1/2 z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-gray-100 p-6 shadow-lg dark:bg-slate-800"
						>
							<AlertDialog.Title class="text-lg font-semibold text-gray-900 dark:text-gray-100">
								Do you really want to delete?
							</AlertDialog.Title>
							<AlertDialog.Description class="mt-2 text-sm text-gray-500 dark:text-gray-400">
								This action cannot be undone. Are you sure you want to continue?
							</AlertDialog.Description>
							<div class="mt-4 flex justify-end gap-2">
								<AlertDialog.Cancel
									class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
								>
									Cancel
								</AlertDialog.Cancel>
								<AlertDialog.Action
									onclick={handleDelete}
									class="inline-flex cursor-pointer items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:ring-1 focus:ring-red-500 focus:outline-none dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-600"
								>
									Delete
								</AlertDialog.Action>
							</div>
						</AlertDialog.Content>
					</AlertDialog.Portal>
				</AlertDialog.Root>
			{/if}
		</div>
	</header>

	{#if isEditing}
		<div class="mb-4 max-w-none">
			<MarkdownEditor
				mode="tabs"
				highlightDelay={10}
				disableToolbar={true}
				{carta}
				bind:value={editableContent}
				class="rounded-xl border  border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
			/>
		</div>
		<div class="flex justify-end gap-2">
			<button
				onclick={handleCancelEdit}
				class="z-50 cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
			>
				Cancel
			</button>
			<button
				onclick={handleSaveEdit}
				class="z-50 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
			>
				Save Changes
			</button>
		</div>
	{:else}
		<div
			animate-in
			use:animateIn={{ blur: 2, y: 5, delay: 0.6 }}
			class="prose lg:prose-lg dark:prose-invert max-w-none"
		>
			{@html processedContent}
		</div>
	{/if}
</article>



