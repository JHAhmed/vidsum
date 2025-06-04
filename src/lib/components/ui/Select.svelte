<script>
	import { Select } from 'bits-ui';
	// import X from 'phosphor-svelte/lib/X';
	import Check from 'phosphor-svelte/lib/Check';
	import CaretUpDown from 'phosphor-svelte/lib/CaretUpDown';

	let { label, type = "single", value = $bindable(), required, options } = $props();
	// const selectedLabel = $derived(
	// 	value.length
	// 		? options
	// 				.filter((option) => value.includes(option.value))
	// 				.map((option) => option.label)
	// 				.join(', ')
	// 		: label
	// );
	const selectedLabel = $derived(options.find((option) => option.value === value)?.label || label);
</script>

<label
	for={`${label}-input`}
	class="mb-1.5 block text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300"
	>{label}</label
>

<Select.Root type={type} bind:value items={options}>
	<Select.Trigger
		class="flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
		aria-label="Select an option"
	>
		{selectedLabel}
		<CaretUpDown class="ml-auto size-6 text-gray-500 dark:text-gray-400" />
	</Select.Trigger>
	<Select.Portal class="w-full">
		<Select.Content
			class="z-50 flex h-fit w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] rounded-xl border border-gray-200 bg-white p-2 shadow-lg outline-hidden select-none dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900/20"
			sideOffset={10}
		>
			<Select.Viewport class="flex w-full flex-col items-center justify-center p-1">
				{#each options as option, i (i + option.value)}
					<Select.Item
						class="m-auto my-1 inline-flex w-full items-center rounded-md p-2 px-3 text-sm text-gray-900 outline-hidden select-none hover:bg-gray-100 focus:bg-gray-100 data-disabled:opacity-50 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
						value={option.value}
						label={option.label}
					>
						{#snippet children({ selected })}
							{option.label}
							{#if selected}
								<div class="ml-auto">
									<!-- <X aria-label="x" /> -->
									<Check class="text-blue-500 dark:text-blue-400" aria-label="check" />
								</div>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
