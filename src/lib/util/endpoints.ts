import type { UnionToIntersection } from 'firebase/firestore';
import type { FlexSchedule } from '../types/FlexSchedule';
import type { Implements } from '../types/Util';

export const ENDPOINTS = {
	GET: {
		Flex: {
			GetSchedule: '/api/flex/getSchedule/'
		}
	},
	POST: {
		Flex: {
			AddSchedule: '/api/flex/addSchedule/',
			DeleteSchedule: '/api/flex/deleteSchedule/'
		}
	}
} as const;

type FetchEndpointTypeMap = Implements<
	EndpointTypeMap,
	{
		'/api/flex/getSchedule/': FlexSchedule | null;
	}
>;

type Keys<T extends keyof typeof ENDPOINTS> = (typeof ENDPOINTS)[T][keyof (typeof ENDPOINTS)[T]];

type FlattenedEndpoints<T extends keyof typeof ENDPOINTS> = UnionToIntersection<
	Keys<T>
>[keyof UnionToIntersection<Keys<T>>];

type EndpointTypeMap = {
	[key in FlattenedEndpoints<'GET'>]: unknown;
};

export async function fetchEndpoint<T extends FlattenedEndpoints<'GET'>>(
	endpoint: T
): Promise<FetchEndpointTypeMap[T]> {
	const res = await fetch(endpoint);
	if (res.status !== 200) {
		throw new Error('Failed to fetch endpoint');
	}
	return (await res.json()) as FetchEndpointTypeMap[T];
}

export function postEndpoint<T extends FlattenedEndpoints<'POST'>>(endpoint: T) {
	return fetch(endpoint, { method: 'POST' });
}
