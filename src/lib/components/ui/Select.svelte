<script lang="ts">
	import { Select } from 'bits-ui';
	import Check from 'phosphor-svelte/lib/Check';
	import CaretDown from 'phosphor-svelte/lib/CaretDown';

	const options = [
		{ value: 'light-monochrome', label: 'Light Monochrome' },
		{ value: 'dark-green', label: 'Dark Green' }
	];

	let value = $state<string>('');
	const selectedLabel = $derived(
		value ? options.find((option) => option.value === value)?.label : 'Select an option'
	);
</script>

<Select.Root type="single" onValueChange={(v) => (value = v)} items={options}>
	<Select.Trigger
		class="inline-flex h-10 w-[296px] cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 text-sm transition-colors"
		aria-label="Select an option"
	>
		<span>{selectedLabel}</span>
		<CaretDown class="ml-auto h-6 w-6 text-gray-500" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="z-50 h-fit translate-y-1 rounded-lg
      border border-gray-200
      bg-white px-1 py-3 shadow-lg transition-opacity
      duration-100 select-none focus:outline-none"
			sideOffset={10}
		>
			<Select.Viewport class="p-1">
				{#each options as option, i (i + option.value)}
					<Select.Item
						class="flex h-10 w-full items-center rounded py-3 pr-2 pl-5 text-sm capitalize
            select-none hover:bg-gray-100 focus:outline-none disabled:opacity-50"
						value={option.value}
						label={option.label}
					>
						{#snippet children({ selected })}
							{option.label}
							{#if selected}
								<div class="ml-auto text-blue-600">
									<Check aria-label="check" />
								</div>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
