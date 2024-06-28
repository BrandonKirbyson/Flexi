import type { Dayjs } from 'dayjs';

export function formatFirebaseDate(day: Dayjs): string {
	return day.format('YYYY-MM-DD');
}
