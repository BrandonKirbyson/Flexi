import { scheduleAdminCollection } from '@/lib/firebase/admin';
import type { FlexSchedule } from '@/lib/types/FlexSchedule';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function POST({ url }: RequestEvent) {
	if (!url.searchParams.get('date')) return new Response(null, { status: 400 });
	const date = dayjs(url.searchParams.get('date'));

	const schedule: FlexSchedule = {
		date: dayjs(date),
		classes: {}
	};

	await scheduleAdminCollection.add(schedule);
	console.log('Schedule added');
}
