import type { SchoolData } from '$lib/types/SchoolData';
import serviceAccount from '@/../private-fb-key.json';
import type { Flex, FlexDocument } from '@/lib/types/Flex';
import type { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';
import { CollectionReference, Firestore, type DocumentData } from 'firebase-admin/firestore';

const params: ServiceAccount = {
	projectId: serviceAccount.project_id,
	privateKey: serviceAccount.private_key,
	clientEmail: serviceAccount.client_email
};

const isDev = import.meta.env.DEV;

if (isDev) process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

// let db: database.Database | null = null;
// export const getAdminApp = (): database.Database => {
// 	if (!db) {
// 		admin.initializeApp({
// 			credential: admin.credential.cert(params)
// 		});
// 		db = admin.database();
// 	}
// 	return db;
// };

let app: admin.app.App | null = null;
let firestore: Firestore | null = null;
export const getAdminApp = () => {
	if (!app) {
		app = admin.app();
	}
	return app;
};

export const getFS = (): admin.firestore.Firestore => {
	if (!firestore) {
		firestore = getAdminApp().firestore();
	}
	return firestore;
};

const createCollection = <T = DocumentData>(collectionName: string) => {
	return getFS().collection(collectionName) as CollectionReference<T>;
};

export const flexAdminCollection = createCollection<FlexDocument>('flex');
export const teachersColAdmin = createCollection<Flex>('teachers');
export const schoolDataColAdmin = createCollection<SchoolData>('school');
