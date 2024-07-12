// import type { FlexFormProps } from '@/lib/types/Flex';
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

		const title = data.get('title');
		console.log('Got title', title);
		// const description = data.get('description');
		// const room = data.get('room');
		// const seats = data.get('seats');
		// const name = data.get('name');
		// const image = data.get('image');
		// if (!title || !description || !room || !seats || !name) {
		// 	return new Response('Missing required fields', { status: 400 });
		// }

		// if (image) {
		// 	console.log('UPloading', image);
		// 	const imageURL = postEndpoint(ENDPOINTS.POST.UploadImage, {
		// 		file: image as File
		// 	});
		// 	console.log('URL ', imageURL);
		// }

		// postEndpoint(ENDPOINTS.POST.Flex.AddFeaturedFlex, {
		// 	date: 'today',
		// 	title: String(title),
		// 	description: String(description),
		// 	name: String(name)
		// });
	}
} satisfies Actions;
