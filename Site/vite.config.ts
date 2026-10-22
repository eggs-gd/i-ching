import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// the dev server may read the app's data, which sits next to the site
	server: { fs: { allow: ['..'] } }
});
