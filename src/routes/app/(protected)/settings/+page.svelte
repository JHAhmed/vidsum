<script>
	import { Select } from '$components';
	// import { apiKey, model } from '$lib/state.svelte';

	let apiKey = $state('');
	let model = $state('gemini-2.0-flash');

	const providers = [
		{ label: 'OpenAI', value: 'OpenAI' },
		{ label: 'Google', value: 'Google' },
		{ label: 'Anthropic', value: 'Anthropic' }
	];

	// const models = [
	// 	{ label: 'gpt-4.1-mini', value: 'gpt-4.1-mini' },
	// 	{ label: 'Gemini', value: 'gemini' },
	// 	{ label: 'Claude', value: 'claude' }
	// ];

	const models = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-2.5-flash-preview-04-17'];
</script>

<div class="z-100 space-y-6">
	<div class="">
		<label
			for="api-key-input"
			class="mb-1.5 block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">API Key</label
		>
		<input
			id="api-key-input"
			type="text"
			placeholder="Gemini API Key"
			bind:value={apiKey}
			class="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500"
		/>
	</div>
	<div class="">
		<label
			for="model-input"
			class="mb-1.5 block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">Model Name</label
		>
		<input
			id="model-input"
			type="text"
			placeholder="gemini-2.0-flash"
			bind:value={model}
			class="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500"
		/>
		<div class="my-2 flex space-x-2">
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
