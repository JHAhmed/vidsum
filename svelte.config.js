import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	kit: {
		adapter: adapter({
			// maxDuration: 30,
		  }),
		alias: {
			$shared: 'src/lib/shared',
			$components: 'src/lib/components',
		},
	},
	preprocess: vitePreprocess(),
};
export default config;