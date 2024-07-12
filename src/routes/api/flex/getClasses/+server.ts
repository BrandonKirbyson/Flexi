import { flexAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiFetch } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	return await apiFetch<typeof ENDPOINTS.GET.Flex.GetClasses>(event, async () => {
		const doc = await flexAdminCollection.doc('classes').get();
		if (!doc.exists) return [{}, HttpStatusCode.NOT_FOUND];

		const data = doc.data();
		if (typeof data === 'undefined') return [{}, HttpStatusCode.NOT_FOUND];
		const classes = data.classes;

		return [classes, HttpStatusCode.SUCCESS];
	});
}
