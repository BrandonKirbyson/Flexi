import type { UnionToIntersection } from 'firebase/firestore';
import type { Flex } from '../types/Flex';
import type { FlexSchedule } from '../types/FlexSchedule';
import type { Implements } from '../types/Util';

export const ENDPOINTS = {
	GET: {
		Flex: {
			GetSchedule: '/api/flex/getSchedule',
			GetClasses: '/api/flex/getClasses'
		}
	},
	POST: {
		Flex: {
			AddSchedule: '/api/flex/addSchedule',
			DeleteSchedule: '/api/flex/deleteSchedule'
		}
	}
} as const;

// type EmptyOnly<T> = T extends infer R
// ? R extends { [K in keyof R]: never }
// ? true
// : never;

// let valid: EmptyOnly<{}>; // This is valid
// valid = {}; // This is also valid
const emptySymbol = Symbol('EmptyObject type');
export interface EmptyObject {
	[emptySymbol]?: never;
}

type FetchEndpointMap = Implements<
	EndpointMapType<'GET'>,
	{
		[ENDPOINTS.GET.Flex.GetSchedule]: {
			return: FlexSchedule | null;
			params: {
				date: string;
			};
		};
		[ENDPOINTS.GET.Flex.GetClasses]: {
			return: Record<string, Flex>;
			params: EmptyObject;
		};
	}
>;

type PostEndpointMap = Implements<
	EndpointMapType<'POST'>,
	{
		[ENDPOINTS.POST.Flex.AddSchedule]: {
			return: FlexSchedule;
			params: {
				date: string;
			};
		};
		[ENDPOINTS.POST.Flex.DeleteSchedule]: {
			return: undefined;
			params: {
				date: string;
			};
		};
	}
>;

type EndpointMapType<T extends keyof typeof ENDPOINTS> = {
	[key in FlattenedEndpoints<T> as string]: {
		return: unknown;
		params: T extends 'GET' ? Record<string, string> | EmptyObject : Record<string, string>;
	};
};

type Keys<T extends keyof typeof ENDPOINTS> = (typeof ENDPOINTS)[T][keyof (typeof ENDPOINTS)[T]];

type FlattenedEndpoints<T extends keyof typeof ENDPOINTS> = UnionToIntersection<
	Keys<T>
>[keyof UnionToIntersection<Keys<T>>];

export async function fetchEndpoint<T extends FlattenedEndpoints<'GET'>>(
	endpoint: T,
	params: FetchEndpointMap[T]['params']
): Promise<FetchEndpointMap[T]['return']> {
	const res = await fetch(
		`${endpoint}?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
	if (!res.status.toString(10).startsWith('2')) {
		throw new Error(res.status.toString());
	}

	const data = await res.text();
	if (data.length === 0) return null;
	else {
		try {
			return (await JSON.parse(data)) as FetchEndpointMap[T]['return'];
		} catch (err) {
			throw new Error(`Failed to parse JSON fetching from ${endpoint}. Error: ${err as string}`);
		}
	}
}

export async function postEndpoint<T extends FlattenedEndpoints<'POST'>>(
	endpoint: T,
	data: PostEndpointMap[T]['params']
): Promise<PostEndpointMap[T]['return']> {
	const res = await fetch(endpoint, { method: 'POST', body: JSON.stringify(data) });
	if (!res.status.toString(10).startsWith('2')) {
		throw new Error(res.status.toString());
	}
	return (await res.json()) as Promise<PostEndpointMap[T]['return']>;
}
