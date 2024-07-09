import { goto } from '$app/navigation';
import { UserType } from '@/lib/types/UserType';
import { session } from '../../stores/user';

export function load() {
	session.subscribe((session) => {
		if (!session.loading && !session.uid) void goto('/login');
		console.log('session.userType', session.userType);
		if (session.userType && session.userType !== UserType.Admin) void goto(`/${session.userType}`);
	});
}
