import { browser } from '$app/environment';
import type { LoadEvent } from '@sveltejs/kit';
import { initializeFirebase } from '../lib/firebase/firebase';

export function load({ url }: LoadEvent) {
	if (browser) {
		try {
			initializeFirebase();
		} catch (ex) {
			console.error(ex);
		}
	}

	return {
		url: url.pathname
	};
}
