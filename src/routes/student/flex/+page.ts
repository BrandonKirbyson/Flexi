import { goto } from '$app/navigation';
import type { Flex } from '@/lib/types/Flex';
import type { LoadEvent } from '@sveltejs/kit';
import { session } from '../../../stores/user';

export const load = async ({ fetch }: LoadEvent) => {
	session.subscribe((user) => {
		if (!user.loading && !user.uid) {
			goto('/login');
		}
	});

	const classes = (await (await fetch('/api/flex/getClasses')).json()) as Record<string, Flex>;

	return { classes };
};
