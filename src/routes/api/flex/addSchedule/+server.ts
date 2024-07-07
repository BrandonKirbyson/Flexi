import { scheduleAdminCollection } from '@/lib/firebase/admin';
import type { FlexScheduleDocument } from '@/lib/types/FlexSchedule';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { DAY_FORMAT } from '@/lib/util/date';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.AddSchedule>(event, async (params) => {
		const date = dayjs(params.date);

		const doc: FlexScheduleDocument = {
			date: date.format(DAY_FORMAT),
			classes: {}
		};

		await scheduleAdminCollection.add(doc);

		const schedule = {
			classes: doc.classes,
			date: date
		};

		return [schedule, HttpStatusCode.SUCCESS_CREATED];
	});
}
