import { adminStorage, flexAdminCollection } from '@/lib/firebase/admin';
import { FlexDept, FlexType, type Flex } from '@/lib/types/Flex';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import { formatStringToName } from '@/lib/util/name';
import type { RequestEvent } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.Flex.AddFeaturedFlex>(event, async (params) => {
		const obj: Flex = {
			type: FlexType.Featured,
			title: params.title,
			description: params.description,
			room: params.room,
			dept: FlexDept.Feature,
			seats: params.seats,
			students: {},
			teacher: formatStringToName(params.name),
			imageUrl: ''
		};

		const classesDoc = await flexAdminCollection.doc('classes').get();
		const data = classesDoc.data();
		if (!classesDoc.exists || !data) return [null, 303];
		const classes = data.classes;
		const uid = uuidv4();

		if (params.bytes) {
			try {
				const buffer = Buffer.from(JSON.stringify(params.bytes));

				const filePath = uuidv4();
				const file = adminStorage.bucket().file(filePath);

				await file.save(buffer, { contentType: 'application/octet-stream' });
				// return [file.publicUrl(), HttpStatusCode.SUCCESS_CREATED];
				obj.imageUrl = file.publicUrl();
				classes[uid] = obj;
				flexAdminCollection.doc('classes').set({
					classes
				});
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}

		classes[uid] = obj;
		console.log('classes', classes);
		console.log('adding obj', obj);
		await flexAdminCollection.doc('classes').set({ classes }, { merge: true });

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

		return [obj, HttpStatusCode.SUCCESS];

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
