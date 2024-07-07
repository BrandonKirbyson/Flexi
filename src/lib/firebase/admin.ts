import type { SchoolData } from '$lib/types/SchoolData';
import serviceAccount from '@/../private-fb-key.json';
import type { Flex, FlexDocument } from '@/lib/types/Flex';
import type { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';
import { CollectionReference, Firestore, type DocumentData } from 'firebase-admin/firestore';
import type { FlexScheduleDocument } from '../types/FlexSchedule';

const params: ServiceAccount = {
	projectId: serviceAccount.project_id,
	privateKey: serviceAccount.private_key,
	clientEmail: serviceAccount.client_email
};

const isDev = import.meta.env.DEV;

if (isDev) process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

const app: admin.app.App =
	admin.apps.length === 0
		? admin.initializeApp({
				credential: admin.credential.cert(params)
			})
		: admin.app();
const firestore: Firestore = app.firestore();

const createCollection = <T = DocumentData>(collectionName: string) => {
	return firestore.collection(collectionName) as CollectionReference<T>;
};

export const flexAdminCollection = createCollection<FlexDocument>('flex');
export const scheduleAdminCollection = createCollection<FlexScheduleDocument>('schedule');
export const teachersColAdmin = createCollection<Flex>('teachers');
export const schoolDataColAdmin = createCollection<SchoolData>('school');
