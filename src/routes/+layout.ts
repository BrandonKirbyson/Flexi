import { browser } from '$app/environment';
import { initializeFirebase } from '$lib/firebase/firebase';
import type { LoadEvent } from '@sveltejs/kit';

export function load(event: LoadEvent) {
	if (browser) {
		try {
			initializeFirebase();
		} catch (ex) {
			console.error(ex);
		}
	}

	return {
		url: event.url.pathname
	};
}
