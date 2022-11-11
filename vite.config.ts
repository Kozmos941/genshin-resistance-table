import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__LAST_UPDATE__: new Date(),
	},
	resolve: {
    extensions: ['.ts', '.js', '.vue'],
  },
};

export default config;
