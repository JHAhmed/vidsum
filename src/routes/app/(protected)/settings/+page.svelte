<script>
	import { Select, Tabs } from '$components';
	// import { apiKey, model } from '$lib/state.svelte';

	let savedKeys = $state(['your-api-key-1', 'your-api-key-2']);

	let apiKey = $state('');
	let provider = $state('google');
	let model = $state('');

	const models = $derived.by(() => {
		if (provider === 'google') {
			return ['gemini-2.0-flash', 'gemini-2.5-flash-preview-05-20', 'gemini-2.0-flash-lite'];
		} else if (provider === 'openai') {
			return ['o4-mini', 'gpt-4.1-mini', 'gpt-4o-mini'];
		}
		return [];
	});
</script>

<div class="flex flex-col items-center justify-center py-32">
	<div class="z-100 space-y-6 min-w-xs md:min-w-lg">
		<div class="">
			<Tabs
				onValueChange={(newValue) => {provider = newValue; model = '';}}
				value={provider}
				label="API Provider"
				tabs={{
					google: 'Google',
					openai: 'OpenAI'
				}}
			/>
		</div>
		<div class="">
			<label
				for="api-key-input"
				class="mb-1.5 block text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300"
				>API Key</label
			>
			<input
				id="api-key-input"
				type="text"
				placeholder={provider === 'google' ? "Gemini API Key" : "OpenAI API Key"}
				bind:value={apiKey}
				class="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500"
			/>
		</div>
		<div class="">
			<label
				for="model-input"
				class="mb-1.5 block text-xs font-medium text-gray-700 md:text-sm dark:text-gray-300"
				>Model Name</label
			>
			<input
				id="model-input"
				type="text"
				placeholder={provider === 'google' ? "gemini-2.0-flash" : "o4-mini"}
				bind:value={model}
				class="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500"
			/>
			<div class="my-2 flex items-center justify-center space-x-2 ">
				{#each models as mdl}
					<button
						onclick={() => (model = mdl)}
						class="cursor-pointer rounded-md border border-blue-400 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
						>{mdl}</button
					>
				{/each}
			</div>
		</div>
	</div>
</div>
