import { browser } from '$app/environment';
import type { LoadEvent } from '@sveltejs/kit';

export function load({ url }: LoadEvent) {
	if (browser) {
		try {
			// uploadClassData();
			// initializeFirebase();
		} catch (ex) {
			console.error(ex);
		}
	}

	return {
		url: url.pathname
	};
}
