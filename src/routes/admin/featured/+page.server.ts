// import type { FlexFormProps } from '@/lib/types/Flex';
import { ENDPOINTS, postEndpoint } from '@/lib/util/endpoints';
import type { Actions } from './$types';

export interface FlexFormProps {
	title: string;
	description: string;
	room: string;
	seats: number;
	name: string;
	imageUrl: string;
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const imageURL = data.get('image');
		if (imageURL) console.log('Image URL', imageURL);

		// const image = data.get('image');
		// if (image) console.log('Image', JSON.stringify(image));
		// const description = data.get('description');
		// const room = data.get('room');
		// const seats = data.get('seats');
		// const name = data.get('name');
		// const image = data.get('image');
		// if (!title || !description || !room || !seats || !name) {
		// 	return new Response('Missing required fields', { status: 400 });
		// }

		postEndpoint(ENDPOINTS.POST.Flex.AddFeaturedFlex, {
			date: 'today',
			title: 'hi',
			description: 'desc',
			name: 'Teacher Name'
		});
		return { success: true };
	}
} satisfies Actions;
