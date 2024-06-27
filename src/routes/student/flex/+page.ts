import { session } from '@/stores/user';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const unsubscribe = session.subscribe((user) => {
		if (!user) {
			throw redirect(302, '/login');
		}
	});

	unsubscribe();

	return {};
};
