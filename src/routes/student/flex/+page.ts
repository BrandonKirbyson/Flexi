import { redirect } from '@sveltejs/kit';
import { session } from '../../../stores/user';

export const load = () => {
	const unsubscribe = session.subscribe((user) => {
		if (!user.loading && !user.uid) {
			redirect(302, '/login');
		}
	});

	unsubscribe();

	return {};
};
