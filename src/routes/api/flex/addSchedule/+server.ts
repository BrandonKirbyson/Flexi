import { scheduleAdminCollection } from '@/lib/firebase/admin';
import type { FlexScheduleDocument } from '@/lib/types/FlexSchedule';
import { DAY_FORMAT } from '@/lib/util/date';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';

export async function POST(event: RequestEvent) {
	const body = (await event.request.json()) as { date: string };
	if (!body.date) return new Response(null, { status: 400 });

	const date = dayjs(body.date);

	const schedule: FlexScheduleDocument = {
		date: date.format(DAY_FORMAT),
		classes: {}
	};

	await scheduleAdminCollection.add(schedule);
	return new Response(null, { status: 200 });
}
