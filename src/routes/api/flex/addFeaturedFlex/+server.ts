import { adminStorage } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.AddFeaturedFlex>(event, async (params) => {
		const date = dayjs(params.date);

		let imageURL = '';
		if (params.bytes) {
			try {
				const buffer = Buffer.from(JSON.stringify(params.bytes));

				const filePath = uuidv4();
				const file = adminStorage.bucket().file(filePath);

				await file.save(buffer, { contentType: 'application/octet-stream' });
				console.log('RETURNING', file.publicUrl());
				// return [file.publicUrl(), HttpStatusCode.SUCCESS_CREATED];
				imageURL = file.publicUrl();
			} catch (error) {
				console.error('Error uploading file:', error);
				return [null, HttpStatusCode.BAD_REQUEST];
			}
		}

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
