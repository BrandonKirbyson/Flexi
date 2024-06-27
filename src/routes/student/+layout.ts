import { session } from '@/stores/user';
import { redirect } from '@sveltejs/kit';

export async function load() {
	session.subscribe((user) => {
		if (!user) throw redirect(302, '/login');
	});

	// unsubscribe();
}
