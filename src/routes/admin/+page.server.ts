import { UserType } from '@/lib/types/UserType';
import { session } from '@/stores/user';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export function load() {
	if (get(session).userType === UserType.Admin) return redirect(308, '/admin/dashboard');
}
