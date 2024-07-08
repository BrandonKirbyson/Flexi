import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
	plugins: [
		sveltekit(),
		checker({
			typescript: true
		}),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	test: {
		include: ['tests/unit/*.{test,spec}.{js,ts}']
	}
} as UserConfig);
