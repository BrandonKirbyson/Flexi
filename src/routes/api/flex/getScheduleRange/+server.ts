import { scheduleAdminCollection } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiFetch } from '@/lib/util/api';
import { DAY_FORMAT } from '@/lib/util/date';
import { ENDPOINTS } from '@/lib/util/endpoints';
import dayjs from 'dayjs';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent): Promise<Response> {
	return await apiFetch<typeof ENDPOINTS.GET.Flex.GetScheduleRange>(event, async (params) => {
		const { startDate, endDate } = params;
		const snapshot = await scheduleAdminCollection
			.where('date', '>', startDate)
			.where('date', '<', endDate)
			.limit(params.limit ? parseInt(params.limit) : 31)
			.get();

		if (snapshot.docs.length === 0) return [[], HttpStatusCode.SUCCESS];

		const flexSchedules = snapshot.docs.map((doc) => {
			return {
				date: dayjs(doc.data().date),
				classes: doc.data().classes
			};
		});

		console.log(
			params.limit,
			flexSchedules[0].date.format(DAY_FORMAT),
			typeof flexSchedules[0].date
		);

		return [flexSchedules, HttpStatusCode.SUCCESS];
	});
}
