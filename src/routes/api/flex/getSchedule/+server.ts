import { scheduleAdminCollection } from '@/lib/firebase/admin';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent): Promise<Response | null> {
	const date = event.url.searchParams.get('date');
	const snapshot = await scheduleAdminCollection.where('date', '==', date).limit(1).get();
	if (snapshot.docs.length === 0) return new Response('Not Found', { status: 404 });

	const schedule = snapshot.docs[0].data();

	event.setHeaders({
		'cache-control': 'public, max-age=60'
	});

	return json(schedule);
}
