import { db } from '@/lib/db';
import { flexTable } from '@/lib/db/schema';
import { FlexDept, type Flex, type FlexClasses } from '@/lib/types/Flex';
import { HttpStatusCode } from '@/lib/types/HttpStatus';
import { apiFetch } from '@/lib/util/api';
import { ENDPOINTS } from '@/lib/util/endpoints';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	return await apiFetch<typeof ENDPOINTS.GET.Flex.GetClasses>(event, async () => {
		const classes = await db.select().from(flexTable).execute();
		const flexClasses = {} as FlexClasses;

		for (const flex of classes) {
			const { id, type, title, room, dept, seats, teacherFirstName, teacherLastName } = flex;
			const teacher = { first: teacherFirstName, last: teacherLastName };
			flexClasses[id] = { type, title, room, dept: dept as FlexDept, seats, teacher } as Flex;
		}

		return [flexClasses, HttpStatusCode.SUCCESS];
	});
}
