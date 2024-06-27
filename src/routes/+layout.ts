import { browser } from '$app/environment';
import { initializeFirebase } from '$lib/firebase/firebase';

export async function load({ url }) {
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
