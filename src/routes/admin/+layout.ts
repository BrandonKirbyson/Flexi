import { goto } from '$app/navigation';
import { UserType } from '@/lib/types/UserType';
import type { LoadEvent } from '@sveltejs/kit';
import { session } from '../../stores/user';

export function load({ url }: LoadEvent) {
	session.subscribe((session) => {
		if (!session.loading && !session.uid) void goto('/login');
		if (session.userType && session.userType !== UserType.Admin) void goto(`/${session.userType}`);
		if (url.href.endsWith('/teacher')) void goto('/admin/dashboard');
	});
}
