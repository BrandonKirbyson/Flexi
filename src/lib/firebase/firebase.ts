import { browser } from '$app/environment';
import {
	PUBLIC_FB_API_KEY,
	PUBLIC_FB_APP_ID,
	PUBLIC_FB_AUTH_DOMAIN,
	PUBLIC_FB_FIRESTORE_PORT,
	PUBLIC_FB_LOCAL_URL,
	PUBLIC_FB_MEASUREMENT_ID,
	PUBLIC_FB_MESSAGE_SENDER_ID,
	PUBLIC_FB_PROJECT_ID,
	PUBLIC_FB_STORAGE_BUCKET
} from '$env/static/public';
import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import {
	CollectionReference,
	collection,
	connectFirestoreEmulator,
	getCountFromServer,
	getFirestore,
	type Firestore
} from 'firebase/firestore';
import type { AdminData } from '../types/Admin';
import type { StudentData } from '../types/Student';
import type { TeacherData } from '../types/Teacher';
import type { UserType } from '../types/UserType';
import type { ValueOf } from '../types/Util';
import { uploadClassData, uploadUserData } from './admin/upload';
import { initAuth } from './auth';

export let db: Firestore | null;
export let app: FirebaseApp | null;
export let auth: Auth | null;

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
		db = getFirestore(app);

		if (firebaseConfig.useEmulator) {
			// connectAuthEmulator(auth, `http://${PUBLIC_FB_LOCAL_URL}:${PUBLIC_FB_AUTH_PORT}`, {
			// disableWarnings: true
			// });
			connectFirestoreEmulator(db, PUBLIC_FB_LOCAL_URL, parseInt(PUBLIC_FB_FIRESTORE_PORT, 10));

			getCountFromServer(collection(db, 'flex')).then((snapshot) => {
				if (snapshot.data().count !== 0) return;
				uploadClassData();
			});

			getCountFromServer(collection(db, 'users')).then((snapshot) => {
				if (snapshot.data().count !== 0) return;
				uploadUserData();
			});
		}

		initAuth(auth);
	}
};

export function getUsersCollection() {
	type Union = StudentData & TeacherData & AdminData;
	if (!db) throw new Error('Firestore not initialized');
	return collection(db, 'users') as CollectionReference<{
		[_ in keyof (Union & { type: string })]: ValueOf<Union> | UserType;
	}>;
}

export function getScheduleCollection() {
	if (!db) throw new Error('Firestore not initialized');
	return collection(db, 'schedule');
}
