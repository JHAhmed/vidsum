import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// import { mdsvex } from 'mdsvex';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';

const config = {
	// extensions: ['.svelte', '.md', '.svx'],
	extensions: ['.svelte'],
	kit: {
		adapter: adapter({
			// maxDuration: 30,
		  }),
		alias: {
			$shared: 'src/lib/shared',
			$components: 'src/lib/components',
		},
	},
	preprocess: [
		// mdsvex({
		// 	extensions: ['.md', '.svx'],
		// 	remarkPlugins: [remarkMath],
		// 	rehypePlugins: [rehypeKatex]
		// }),
		vitePreprocess()
	],
};

export default config;