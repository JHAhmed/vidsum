<script>
	import { Note } from '$components';
	import { animateIn } from '$lib';
	import Icon from '@iconify/svelte';

	let { data } = $props();
	let notes = $state(data.notes.supabaseResult); 

	let searchQuery = $state('');

	let filteredNotes = $derived.by(() => {
		if (!searchQuery) return notes; 
		return notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
	});
</script>

<div class="w-full space-y-4 px-4 py-12 md:px-8 md:py-20 lg:space-y-8 lg:px-16">
	<h1 class="text-3xl leading-tight font-medium tracking-tighter text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
		Saved Notes
	</h1>

	<div class="z-50 flex items-center justify-start">
		<div class="h-full scale-95 rounded-l-lg bg-gray-200 md:scale-100 dark:bg-slate-700">
			<Icon
				icon="heroicons:magnifying-glass"
				class="m-4 cursor-pointer text-sm text-gray-500 hover:text-gray-700 md:text-base dark:text-gray-400 dark:hover:text-gray-300"
			/>
		</div>
		<input
			inputmode="text"
			type="text"
			bind:value={searchQuery}
			autocomplete="off"
			id="search-input"
			placeholder="Search notes..."
			class="z-50 rounded-r-lg border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none md:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500"
		/>
	</div>

	<div class="py-10">
		{#if filteredNotes.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredNotes as note, i (note.id)}
					<div class="">
						<Note {note} />
					</div>
				{/each}
			</div>
		{:else if searchQuery}
			<p class="text-center text-gray-500 dark:text-gray-400">
				No notes found matching "{searchQuery}".
			</p>
		{:else}
			<p class="text-center text-gray-500 dark:text-gray-400">You have no saved notes yet.</p>
		{/if}
	</div>
</div>
