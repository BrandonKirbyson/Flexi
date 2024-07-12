import { adminStorage } from '@/lib/firebase/admin';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiPost } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export async function POST(event: RequestEvent) {
	return await apiPost<typeof ENDPOINTS.POST.UploadImage>(event, async (params) => {
		try {
			const buffer = Buffer.from(JSON.stringify(params.bytes));

			const filePath = uuidv4();
			const file = adminStorage.bucket().file(filePath);

			await file.save(buffer, { contentType: 'application/octet-stream' });
			console.log('RETURNING', file.publicUrl());
			return [file.publicUrl(), HttpStatusCode.SUCCESS_CREATED];
		} catch (error) {
			console.error('Error uploading file:', error);
			return [null, HttpStatusCode.BAD_REQUEST];
		}
	});
}
