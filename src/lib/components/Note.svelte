<script>
	import { animateIn } from '$lib';
	import Icon from '@iconify/svelte';

	function truncateString(str, maxLength = 120) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + '...';
		}
		return str;
	}

	let { note, i } = $props();
</script>

<div
	animate-in
	use:animateIn={{ delay: i * 0.3, blur: 4, rotate: 0.5, scale: 0.95, duration: 0.5 }}
	class="relative flex flex-col items-stretch gap-2 rounded-xl border border-gray-800 bg-gray-200 p-4 md:border-none md:p-6 lg:p-8 dark:bg-gray-900"
>
	<!-- <p class="w-fit text-xs font-normal tracking-widest text-gray-500">
		{note.date}
	</p> -->
	<h2 class="text-2xl font-medium text-black dark:text-white">{note.title}</h2>
	<p class="text-md my-4 font-normal text-gray-500">
		<!-- {note.content} -->
		{truncateString(note.content)}
	</p>

	<div class="grow"></div>
	<a
		href="/saved/{note.id}"
		class="group/view inline-flex w-fit cursor-pointer items-center text-sm font-normal tracking-widest text-black uppercase dark:text-white"
		>Read more
		<span
			class="mx-2 flex size-6 items-center justify-center rounded-full transition-all duration-100 group-hover/view:ml-4"
		>
			<Icon icon="heroicons:arrow-right" width="20" height="20" />
		</span>
	</a>
</div>
