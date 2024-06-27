import { browser } from '$app/environment';
import {
	PUBLIC_FB_API_KEY,
	PUBLIC_FB_APP_ID,
	PUBLIC_FB_AUTH_DOMAIN,
	PUBLIC_FB_AUTH_PORT,
	PUBLIC_FB_LOCAL_URL,
	PUBLIC_FB_MEASUREMENT_ID,
	PUBLIC_FB_MESSAGE_SENDER_ID,
	PUBLIC_FB_PROJECT_ID,
	PUBLIC_FB_STORAGE_BUCKET
} from '$env/static/public';
import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const isDev = import.meta.env.DEV;

const firebaseConfig = {
	apiKey: PUBLIC_FB_API_KEY,
	authDomain: PUBLIC_FB_AUTH_DOMAIN,
	projectId: PUBLIC_FB_PROJECT_ID,
	storageBucket: PUBLIC_FB_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FB_MESSAGE_SENDER_ID,
	appId: PUBLIC_FB_APP_ID,
	measurementId: PUBLIC_FB_MEASUREMENT_ID,
	useEmulator: isDev
};

export const initializeFirebase = () => {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);

		if (firebaseConfig.useEmulator) {
			console.log(`${PUBLIC_FB_LOCAL_URL}:${PUBLIC_FB_AUTH_PORT}`);
			connectAuthEmulator(auth, `http://${PUBLIC_FB_LOCAL_URL}:${PUBLIC_FB_AUTH_PORT}`);
		}
	}
};
