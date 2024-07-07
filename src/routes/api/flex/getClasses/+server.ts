import { flexAdminCollection } from '@/lib/firebase/admin';

export async function GET(): Promise<Response> {
	const doc = await flexAdminCollection.doc('classes').get();
	if (!doc.exists) throw new Error('Document not found');

	const data = doc.data();
	if (typeof data === 'undefined') return new Response(null, { status: 404 });
	const classes = data.classes;

	return new Response(JSON.stringify(classes), {
		status: 200,
		headers: {
			'content-type': 'application/json'
			// 'cache-control': 'public, max-age=3600'
		}
	});
}
