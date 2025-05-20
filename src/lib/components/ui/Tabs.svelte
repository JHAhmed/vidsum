<script>
	import { Tabs } from 'bits-ui';
    let { tabs, label = 'Tabs', value = "", onValueChange = () => {} } = $props();
</script>

<div class="">
	<label
		for={`${label}-tabs`}
		class="mb-1.5 block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label
	>
	<Tabs.Root
		id={`${label}-tabs`}
		{value}
        {onValueChange}
		class="w-full rounded-lg bg-gray-200 dark:bg-slate-800 p-0.5"
	>
		<Tabs.List class=" flex w-full rounded-lg p-0.5 text-xs md:text-sm font-medium space-x-1 text-zinc-900 dark:text-zinc-100">
			{#each Object.keys(tabs) as tabKey}
				<Tabs.Trigger
					value={tabKey}
					class="h-10 w-full cursor-pointer rounded-md bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-900/50 hover:bg-slate-100/50 data-[state=active]:bg-gray-50  dark:data-[state=active]:bg-slate-900 data-[state=active]:text-black dark:data-[state=active]:text-white"
					>{tabs[tabKey]}</Tabs.Trigger
				>
			{/each}
		</Tabs.List>
	</Tabs.Root>
</div>
