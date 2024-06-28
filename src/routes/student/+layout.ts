import { goto } from '$app/navigation';
import { session } from '@/stores/user';

export async function load() {
	session.subscribe((session) => {
		if (!session.user && !session.loading) goto('/login');
	});
}
