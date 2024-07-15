import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

export const load: LayoutServerLoad = ({ locals: { session }, cookies }: LayoutServerLoadEvent) => {
	return {
		session,
		cookies: cookies.getAll()
	};
};