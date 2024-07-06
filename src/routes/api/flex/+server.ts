import { flexAdminCollection } from '$lib/firebase/admin';
import type { Flex } from '@/lib/types/Flex';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent) {
	const doc = await flexAdminCollection.doc('classes').get();
	if (!doc.exists) return json({});
	const classes = doc.data()?.classes as Record<string, Flex>;

	event.setHeaders({
		'cache-control': 'public, max-age=3600'
	});

	return json(classes);
}
