import { goto } from '$app/navigation';
import { UserType } from '@/lib/types/UserType';
import { session } from '../../stores/user';

export function load() {
	session.subscribe((session) => {
		if (!session.loading && !session.uid) goto('/login');
		if (session.userType && session.userType !== UserType.Student) goto(`/${session.userType}`);
	});
}
