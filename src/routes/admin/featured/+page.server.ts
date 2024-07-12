// import type { FlexFormProps } from '@/lib/types/Flex';
import { ENDPOINTS, postEndpoint } from '@/lib/util/endpoints';
import type { Actions } from './$types';

export interface FlexFormProps {
	title: string;
	// description: string;
	// room: string;
	// seats: number;
	// name: string;
	// imageUrl: string;
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const title = data.get('title');
		const description = data.get('description');
		const room = data.get('room');
		const seats = data.get('seats');
		const name = data.get('name');
		const imageUrl = data.get('title');
		if (!title || !description || !room || !seats || !name || !imageUrl) {
			return new Response('Missing required fields', { status: 400 });
		}

		postEndpoint(ENDPOINTS.POST.Flex.AddFeaturedFlex, {
			date: 'today',
			title: String(title),
			description: String(description),
			name: String(name)
		});
	}
} satisfies Actions;