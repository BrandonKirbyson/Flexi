import { redirect } from '@sveltejs/kit';

export function load() {
	return redirect(308, '/student/dashboard');
}
