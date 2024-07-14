import { uploadClassData } from '@/lib/db/upload';

export function load() {
	uploadClassData();

	return {
		status: 200
	};
}
