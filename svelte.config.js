import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import nesting from 'postcss-nesting';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [nesting()]
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			'$comp': 'src/lib/components',
		}
	}
};

export default config;
