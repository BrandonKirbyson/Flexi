import { flexAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiFetch } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	return await apiFetch<typeof ENDPOINTS.GET.Flex.GetClasses>(event, async (params) => {
		const doc = await flexAdminCollection.doc('classes').get();
		if (!doc.exists) return [{}, HttpStatusCode.NOT_FOUND];

		const data = doc.data();
		if (typeof data === 'undefined') return [{}, HttpStatusCode.NOT_FOUND];
		const classes = data.classes;
		if (params.type)
			return [
				Object.fromEntries(
					Object.entries(classes).filter(([_, value]) => value.type === params.type)
				),
				HttpStatusCode.SUCCESS
			];
		return [classes, HttpStatusCode.SUCCESS];
	});
}
