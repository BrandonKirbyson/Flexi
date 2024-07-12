// import type { FlexFormProps } from '@/lib/types/Flex';
import { ENDPOINTS, postEndpoint, type FlexFormProps } from '@/lib/util/endpoints';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		// const imageURL = data.get('image');
		// if (imageURL) console.log('Image URL', imageURL);
		const imageBlob = data.get('image');
		console.log('this is the image blob', imageBlob);

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

		const FlexClassData: FlexFormProps = {
			date: new Date().toISOString(),
			title: 'title',
			description: 'description',
			name: 'name'
		};

		if (imageBlob) {
			const arr = new Uint8Array(await (imageBlob as Blob).arrayBuffer());
			FlexClassData.imageUrl =
				(await postEndpoint(ENDPOINTS.POST.UploadImage, { bytes: arr }, fetch)) ?? '';
		}

		postEndpoint(ENDPOINTS.POST.Flex.AddFeaturedFlex, FlexClassData, fetch);
		return { success: true };
	}
} satisfies Actions;
