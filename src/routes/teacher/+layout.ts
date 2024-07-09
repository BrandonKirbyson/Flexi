import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { UserType } from '@/lib/types/UserType';
import type { LoadEvent } from '@sveltejs/kit';
import { session } from '../../stores/user';

export function load(event: LoadEvent) {
	if (browser) {
		session.subscribe((session) => {
			if (!session.loading && !session.uid) void goto('/login');
			if (session.userType && session.userType !== UserType.Student)
				void goto(`/${session.userType}`);
			if (event.url.href.endsWith('/teacher')) void goto('/teacher/dashboard');
		});
	}
}
