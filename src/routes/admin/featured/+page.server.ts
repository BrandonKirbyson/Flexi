import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		console.log('submit');
		// const data = await request.formData();
		// const imageBlob = data.get('image');

		// const flexClassData: FlexFormProps = {
		// 	date: new Date().toISOString(),
		// 	title: 'title',
		// 	description: 'description',
		// 	name: 'name'
		// };

		// postEndpoint(ENDPOINTS.POST.Flex.AddFeaturedFlex, flexClassData);
		return { success: true };
	}
} satisfies Actions;
