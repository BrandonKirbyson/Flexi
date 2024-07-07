import { scheduleAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { DAY_FORMAT } from '@/lib/util/date';
import { ENDPOINTS, apiPost } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.DeleteSchedule>(event, async (params) => {
		const date = dayjs(params.date).format(DAY_FORMAT);
		const snapshot = await scheduleAdminCollection.where('date', '==', date).limit(1).get();

		if (snapshot.docs.length === 0) return [null, HttpStatusCode.BAD_REQUEST];

		await snapshot.docs[0].ref.delete();

		return [null, HttpStatusCode.SUCCESS];
	});
}
