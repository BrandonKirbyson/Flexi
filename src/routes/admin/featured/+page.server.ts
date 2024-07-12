// import type { FlexFormProps } from '@/lib/types/Flex';
import { ENDPOINTS, postEndpoint, type FlexFormProps } from '@/lib/util/endpoints';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const imageBlob = data.get('image');

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
