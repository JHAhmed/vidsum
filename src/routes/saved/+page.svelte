<script>
	import { Note } from '$components';

	let { data } = $props();
	let notes = $state(data.notes.supabaseResult);
</script>

<div class="w-full space-y-4 p-8 md:p-16 lg:space-y-2 lg:p-32">
	<h1
		class="my-4 text-3xl leading-tight font-medium tracking-tighter text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
	>
		Saved Notes
	</h1>

	<!-- <p class="text-lg font-extralight tracking-tight text-gray-500 lg:text-2xl">
		Random thoughts, <br /> movie and game reviews, and more.
	</p> -->

	<div class="py-16">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each notes as note, i}
				<Note {note} {i} />
			{/each}
		</div>
	</div>
</div>

<style>
</style>
