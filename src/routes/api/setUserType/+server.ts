import { userAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.SetUserType>(event, async (params) => {
		const snapshot = await userAdminCollection.where('email', '==', params.email).limit(1).get();
		if (snapshot.docs.length === 0) return [null, HttpStatusCode.BAD_REQUEST];
		snapshot.docs[0].ref.update({ type: params.type });

		return [null, HttpStatusCode.SUCCESS];
	});
}
