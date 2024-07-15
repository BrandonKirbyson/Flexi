import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals: { supabase } }) => {
		console.log('TEST');
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/private');
		}
	}
};
