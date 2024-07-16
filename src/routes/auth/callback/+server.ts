import { redirect, type RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			redirect(303, `/${next.slice(1)}`);
		}
	}

	redirect(303, '/auth/auth-code-error');
};
