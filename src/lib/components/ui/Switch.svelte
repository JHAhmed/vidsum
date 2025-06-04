<script lang="ts">
	import { Switch } from 'bits-ui';
	let {
		label = 'Advanced',
		checked = $bindable(false),
	} = $props();
</script>

<div class="">
	<label
		for={`${label}-tabs`}
		class="mb-1.5 block text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300"
		>{label}</label
	>
	<div class="flex h-12 items-center space-x-3">
		<Switch.Root
			id={`${label}-switch`}
			bind:checked
			name="switch"
			class="inline-flex h-10 w-20 cursor-pointer items-center rounded-full bg-gray-200 px-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-700"
		>
			<Switch.Thumb
				class="pointer-events-none block size-8 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0 dark:bg-gray-100"
			/>
		</Switch.Root>
	</div>
</div>
