import { DAY_FORMAT } from '@/lib/util/date';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export function load() {
	return redirect(308, `/student/flex/${dayjs().format(DAY_FORMAT)}`);
}
