import { browser } from '$app/environment';
import { initializeFirebase } from '$lib/firebase/firebase';
import type { LoadEvent } from '@sveltejs/kit';

export function load({ url }: LoadEvent) {
	if (browser) {
		try {
			console.log('start');
			initializeFirebase();
		} catch (ex) {
			console.error(ex);
		}
	}

	return {
		url: url.pathname
	};
}
