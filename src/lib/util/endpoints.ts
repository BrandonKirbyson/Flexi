import type { RequestEvent } from '@sveltejs/kit';
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
	params: FetchEndpointMap[T]['params'] = {}
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

export enum CacheType {
	NONE = '0',
	MINUTE = '60',
	FIVE_MINUTES = '300',
	HOUR = '3600',
	DAY = '86400',
	MONTH = '2592000',
	YEAR = '31536000'
}

export async function apiFetch<T extends FlattenedEndpoints<'GET'>>(
	event: RequestEvent,
	fn: (params: FetchEndpointMap[T]['params']) => Promise<[FetchEndpointMap[T]['return'], number]>,
	cache: CacheType = CacheType.NONE
): Promise<Response> {
	const urlSearch = new URLSearchParams(event.request.url.split('?')[1]);
	const params = {
		...Object.fromEntries(urlSearch.entries())
	} as FetchEndpointMap[T]['params'];
	const [data, status] = await fn(params);
	return new Response(JSON.stringify(data), {
		status: status,
		headers: {
			'content-type': 'application/json',
			'cache-control': `public, max-age=${cache}`
		}
	});
}
