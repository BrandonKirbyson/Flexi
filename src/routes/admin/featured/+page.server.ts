import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// const { title, description, room, seats, firstName, lastName } = data;
		console.log('data', data);
	}
} satisfies Actions;
