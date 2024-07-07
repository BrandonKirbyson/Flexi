import { scheduleAdminCollection } from '@/lib/firebase/admin';
import type { Flex } from '@/lib/types/Flex';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent): Promise<Response> {
	const doc = await scheduleAdminCollection.doc('classes').get();
	if (!doc.exists) throw new Error('Document not found');

	const classes = doc.data()?.classes as Record<string, Flex>;

	event.setHeaders({
		'cache-control': 'public, max-age=3600'
	});

	return json(classes);
}
