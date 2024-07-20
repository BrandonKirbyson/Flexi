import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
import type { PageServerData } from '../$types';

export async function load({ locals: { supabase } }: PageServerData) {
	const classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses, supabase);
	return { classes };
}
