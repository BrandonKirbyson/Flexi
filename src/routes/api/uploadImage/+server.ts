import { adminStorage } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.UploadImage>(event, async (params) => {
		// const storageRef = ref(storage, 'some-child');

		try {
			const buffer = Buffer.from(JSON.stringify(params.bytes));
			console.log('buffer', buffer);

			const fileName = 'jfoiadjsof';
			const filePath = fileName;

			const file = adminStorage.bucket().file(filePath);

			console.log('file', file);
			await file.save(buffer, { contentType: 'application/octet-stream' });
			console.log(`File ${filePath} uploaded successfully.`);
		} catch (error) {
			console.error('Error uploading file:', error);
		}

		// try {
		// 	// Upload the blob
		// 	adminStorage;
		// 	console.log('Uploaded a blob or file!', snapshot.ref.fullPath);
		// 	return [snapshot.ref.fullPath, HttpStatusCode.SUCCESS_CREATED];
		// } catch (e) {
		// 	console.error('Error uploading file', e);
		// 	return [null, HttpStatusCode.BAD_REQUEST];
		// }

		// const date = dayjs(params.file);

		// const schedules = await scheduleAdminCollection
		// 	.where('date', '==', date.format(DAY_FORMAT))
		// 	.limit(1)
		// 	.get();

		// if (schedules.empty) {
		// 	return [null, HttpStatusCode.NOT_FOUND];
		// }

		// const schedule = schedules.docs[0].data();

		// for (const key in schedule.classes) {
		// 	if (schedule.classes[key].students.includes(params.studentId)) {
		// 		schedule.classes[key].students = schedule.classes[key].students.filter(
		// 			(student) => student !== params.studentId
		// 		);
		// 	}
		// }

		// schedule.classes[params.flexId].students.push(params.studentId);

		// scheduleAdminCollection.doc(schedules.docs[0].id).set(schedule);

		return [null, HttpStatusCode.SUCCESS_CREATED];
	});
}
