<script>
	import { onMount } from 'svelte';
	import { animateIn } from '$lib';
</script>

	<div class="content mx-auto max-w-4xl p-4 text-center md:p-8">
		<h1
			class="mb-6 text-4xl leading-tight font-light tracking-tight text-gray-800 dark:text-gray-100 md:text-6xl "
			animate-in use:animateIn={{ y:20, duration: 0.8, delay: 0.3 }}
		>
			Page Not Found!
		</h1>

		<div class="cta mt-4" animate-in use:animateIn={{ y:20, duration: 0.8, delay: 0.5, blur: 4 }}>
			<a
				href="/"
				class="inline-block rounded-full border border-gray-800 dark:border-gray-200 bg-gray-800 dark:bg-gray-100 px-8 py-3 text-white dark:text-gray-900 no-underline transition-all duration-300 ease-in-out hover:bg-transparent hover:text-gray-800 dark:hover:text-gray-100 hover:border-gray-800 dark:hover:border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
			>
				Home
			</a>
		</div>
	</div>