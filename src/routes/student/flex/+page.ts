import { session } from '@/stores/user';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	const unsubscribe = session.subscribe((user) => {
		if (!user.loading && !user.uid) {
			redirect(302, '/login');
		}
	});

	unsubscribe();

	return {};
};
