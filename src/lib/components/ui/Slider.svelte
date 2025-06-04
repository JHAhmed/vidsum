<script>
    let { value = $bindable(2), min = 1, max = 10, step = 1, label = "No. of Screenshots" } = $props();
</script>

<div class="">
<label
	for={`${label}-input`}
	class="mb-1.5 block text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300"
	>{label}</label
>
	<input
		id="electricity-bill"
		type="range"
		min={min}
		max={max}
		step={step}
		bind:value={value}
		class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
	/>
	<div class="mt-1 flex justify-between">
		<span class="text-xs text-gray-500 sm:text-sm">{min}</span>
		<span class="text-xs font-medium text-blue-600 sm:text-sm"
			>{value}</span
		>
		<span class="text-xs text-gray-500 sm:text-sm">{max}</span>
	</div>
</div>
