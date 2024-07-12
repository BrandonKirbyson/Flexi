import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.AddFeaturedFlex>(event, async (params) => {
		// const date = dayjs(params.date);
		await Promise.resolve();
		console.log('Req', params);

		const classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses, {});
		console.log('classes', classes);

		// const classesDoc = await flexAdminCollection.doc('classes').get();
		// const data = classesDoc.data();
		// if (!classesDoc.exists || !data) return [null, HttpStatusCode.NOT_FOUND];
		// const classes = data.classes;
		// const date = dayjs(params.date);

		// const doc: FlexScheduleDocument = {
		// 	date: date.format(DAY_FORMAT),
		// 	classes: Object.fromEntries(
		// 		Object.keys(classes).map((key) => [key, { students: [] as string[] } as ClassSchedule])
		// 	) as Record<string, ClassSchedule>
		// };

		// await scheduleAdminCollection.add(doc);

		// const schedule = {
		// 	classes: doc.classes,
		// 	date: date
		// };

		// return [schedule, HttpStatusCode.SUCCESS_CREATED];

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
