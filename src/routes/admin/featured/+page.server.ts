import type { FlexFormProps } from '@/lib/types/Flex';
import type { TypedFormData } from '@/lib/types/TypedFormData';
import type { Flatten } from '@/lib/types/Util';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = (await request.formData()) as TypedFormData<Flatten<FlexFormProps>>;

		data.get('room');

		console.log('data', data);
	}
} satisfies Actions;
