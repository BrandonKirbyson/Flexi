import { browser } from '$app/environment';
import { auth, initializeFirebase } from '$lib/firebase/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

export async function load({ url }) {
	if (browser) {
		try {
			initializeFirebase();
		} catch (ex) {
			console.error(ex);
		}
	}

	function getAuthUser(): Promise<User | null> {
		return new Promise((resolve) => {
			onAuthStateChanged(auth, (user) => resolve(user ? user : null));
		});
	}

	return {
		getAuthUser: getAuthUser,
		url: url.pathname
	};
}
