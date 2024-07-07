import { scheduleAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiFetch } from '@/lib/util/api';
import { DAY_FORMAT } from '@/lib/util/date';
import { ENDPOINTS } from '@/lib/util/endpoints';
import dayjs from 'dayjs';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent): Promise<Response> {
	return await apiFetch<typeof ENDPOINTS.GET.Flex.GetSchedule>(event, async (params) => {
		const date = dayjs(params.date).format(DAY_FORMAT);
		const snapshot = await scheduleAdminCollection.where('date', '==', date).limit(1).get();

		if (snapshot.docs.length === 0) return [null, HttpStatusCode.SUCCESS_NO_CONTENT];

		const data = snapshot.docs[0].data();
		const schedule = {
			classes: data.classes,
			date: dayjs(data.date)
		};

		return [schedule, HttpStatusCode.SUCCESS];
	});
}
