import { goto } from '$app/navigation';
import { UserType } from '@/lib/types/UserType';
import { session } from '../../stores/user';

export function load() {
	session.subscribe((session) => {
		if (!session.loading && !session.uid) void goto('/login');
		if (session.userType && session.userType !== UserType.Teacher) goto(`/${session.userType}`);
	});
}
