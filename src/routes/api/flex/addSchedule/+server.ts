import { scheduleAdminCollection } from '@/lib/firebase/admin';
import type { FlexScheduleDocument } from '@/lib/types/FlexSchedule';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export async function POST(event: RequestEvent) {
	const body = (await event.request.json()) as { date: string };
	if (!body.date) return new Response(null, { status: 400 });

	const date = dayjs(body.date);

	const schedule: FlexScheduleDocument = {
		date: Timestamp.fromDate(date.toDate()),
		classes: {}
	};

	await scheduleAdminCollection.add(schedule);
	return new Response(null, { status: 200 });
}
