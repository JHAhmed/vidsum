<script>
	import { Tabs } from 'bits-ui';
    let { tabs, label = 'Tabs', value = "", onValueChange = () => {} } = $props();
</script>

<div class="">
	<label
		for={`${label}-tabs`}
		class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label
	>
	<Tabs.Root
		id={`${label}-tabs`}
		{value}
        {onValueChange}
		class="w-full rounded-lg bg-slate-800 p-0.5"
	>
		<Tabs.List class=" flex w-full rounded-lg p-0.5 sm:text-xs md:text-sm font-medium space-x-1">
			{#each Object.keys(tabs) as tabKey}
				<Tabs.Trigger
					value={tabKey}
					class="h-10 w-full cursor-pointer rounded-md bg-slate-800 hover:bg-slate-900/50 text-zinc-50 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
					>{tabs[tabKey]}</Tabs.Trigger
				>
			{/each}
		</Tabs.List>
	</Tabs.Root>
</div>
