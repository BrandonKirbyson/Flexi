import { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID } from '$env/static/private';
import type { SchoolData } from '$lib/types/SchoolData';
import type { Flex, FlexDocument } from '@/lib/types/Flex';
import type { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';
import { CollectionReference, Firestore, type DocumentData } from 'firebase-admin/firestore';
import type { FlexScheduleDocument } from '../types/FlexSchedule';

const params: ServiceAccount = {
	projectId: PROJECT_ID as string,
	privateKey: PRIVATE_KEY as string,
	clientEmail: CLIENT_EMAIL as string
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
export const adminAuth: admin.auth.Auth = app.auth();

const createCollection = <T = DocumentData>(collectionName: string) => {
	return firestore.collection(collectionName) as CollectionReference<T>;
};

export const flexAdminCollection = createCollection<FlexDocument>('flex');
export const scheduleAdminCollection = createCollection<FlexScheduleDocument>('schedule');
export const teachersColAdmin = createCollection<Flex>('teachers');
export const schoolDataColAdmin = createCollection<SchoolData>('school');
