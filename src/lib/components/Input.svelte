<script>
	let {
		label,
		value = $bindable(''),
		onkeydown = () => {},
		required = true,
		placeholder = 'e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		autocomplete = 'off',
		type = 'url'
	} = $props();
</script>

<div>
	<label
		for={`${label}-input`}
		class="mb-1.5 block text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300"
		>{label}</label
	>
	<input
		inputmode="text"
		enterkeyhint="done"
		{type}
		{autocomplete}
		{onkeydown}
		id={`${label}-input`}
		bind:value
		{placeholder}
		class="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 md:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500"
		{required}
	/>
</div>
