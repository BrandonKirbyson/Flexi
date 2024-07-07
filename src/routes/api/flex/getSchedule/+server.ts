import { scheduleAdminCollection } from '@/lib/firebase/admin';
import dayjs from 'dayjs';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent): Promise<Response> {
	const date = dayjs(event.url.searchParams.get('date')).toDate();
	const snapshot = await scheduleAdminCollection.where('date', '==', date).limit(1).get();
	if (snapshot.docs.length === 0) return new Response(null, { status: 204 });

	if (typeof snapshot.docs[0].data() === 'undefined') return new Response(null, { status: 204 });
	const data = snapshot.docs[0].data();
	const schedule = {
		classes: data.classes,
		date: dayjs(data.date.toDate())
	};

	// event.setHeaders({
	// 	'cache-control': 'public, max-age=60'
	// });

	return new Response(JSON.stringify(schedule), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
}
