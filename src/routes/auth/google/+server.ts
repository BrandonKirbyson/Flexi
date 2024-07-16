import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: url.origin + '/auth/callback'
		}
	});

	if (data.url) {
		redirect(307, data.url);
	}

	redirect(307, '/auth/error');
};
