import { goto } from '$app/navigation';
import { session } from '../../stores/user';

export function load() {
	session.subscribe((session) => {
		if (!session.loading && !session.uid) void goto('/login');
	});
}
