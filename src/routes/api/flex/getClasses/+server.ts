import { flexAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { ENDPOINTS, apiFetch } from '@/lib/util/endpoints';
import type { RequestEvent } from '../$types';

export async function GET(event: RequestEvent): Promise<Response> {
	return await apiFetch<typeof ENDPOINTS.GET.Flex.GetClasses>(event, async () => {
		const doc = await flexAdminCollection.doc('classes').get();
		if (!doc.exists) throw new Error('Document not found');

		const data = doc.data();
		if (typeof data === 'undefined') return [{}, HttpStatusCode.NOT_FOUND];
		const classes = data.classes;

		return [classes, HttpStatusCode.SUCCESS];
	});
}
