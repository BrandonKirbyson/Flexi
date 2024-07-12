import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.AddSchedule>(event, async (params) => {
		const date = dayjs(params.date);

		const classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses, {}, event.fetch);
		// const data = classesDoc.data();
		// if (!classesDoc.exists || !data) return [null, HttpStatusCode.NOT_FOUND];
		// const classes = data.classes;

		// const doc: FlexScheduleDocument = {
		// 	date: date.format(DAY_FORMAT),
		// 	classes: Object.fromEntries(
		// 		Object.keys(classes).map((key) => [key, { students: [] as string[] } as ClassSchedule])
		// 	) as Record<string, ClassSchedule>
		// };
		// const doc: FlexScheduleDocument = {
		// 	type: FlexType.Featured,
		// 	title: 'title',
		// 	dept: FlexDept.Math,
		// 	// room: course.courseRoom,
		// 	room: 'room',
		// 	teacher: {
		// 		first: 'first',
		// 		last: 'last'
		// 	},
		// 	seats: 30
		// };

		// await scheduleAdminCollection.add(doc);

		// const schedule = {
		// 	classes: doc.classes,
		// 	date: date
		// };

		return [null, HttpStatusCode.SUCCESS_CREATED];
	});
}
