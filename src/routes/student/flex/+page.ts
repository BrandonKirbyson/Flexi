import { goto } from '$app/navigation';
import { session } from '@/stores/user';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	session.subscribe((user) => {
		if (!user.loading && !user.uid) {
			goto('/login');
		}
	});
};
