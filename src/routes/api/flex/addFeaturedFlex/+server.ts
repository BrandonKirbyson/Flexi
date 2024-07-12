import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.AddFeaturedFlex>(event, async (params) => {
		// const date = dayjs(params.date);
		await Promise.resolve();
		console.log('Req', params);

		return [null, HttpStatusCode.SUCCESS];

		// const doc: FlexScheduleDocument = {
		// 	date: date.format(DAY_FORMAT),
		// 	classes: {}
		// };

		// await scheduleAdminCollection.add(doc);

		// const schedule = {
		// 	classes: doc.classes,
		// 	date: date
		// };

		// return [schedule, HttpStatusCode.SUCCESS_CREATED];
	});
}
