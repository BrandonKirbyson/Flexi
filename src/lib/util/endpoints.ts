import { getIdToken } from 'firebase/auth';
import type { UnionToIntersection } from 'firebase/firestore';
import { auth } from '../firebase/firebase';
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

export type FetchEndpointMap = Implements<
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

export type PostEndpointMap = Implements<
	EndpointMapType<'POST'>,
	{
		[ENDPOINTS.POST.Flex.AddSchedule]: {
			return: FlexSchedule;
			params: {
				date: string;
			};
		};
		[ENDPOINTS.POST.Flex.DeleteSchedule]: {
			return: null;
			params: {
				date: string;
			};
		};
	}
>;

export type EndpointMapType<T extends keyof typeof ENDPOINTS> = {
	[key in FlattenedEndpoints<T> as string]: {
		return: unknown;
		params: T extends 'GET' ? Record<string, string> | EmptyObject : Record<string, string>;
	};
};

type Keys<T extends keyof typeof ENDPOINTS> = (typeof ENDPOINTS)[T][keyof (typeof ENDPOINTS)[T]];

export type FlattenedEndpoints<T extends keyof typeof ENDPOINTS> = UnionToIntersection<
	Keys<T>
>[keyof UnionToIntersection<Keys<T>>];

export async function fetchEndpoint<T extends FlattenedEndpoints<'GET'>>(
	endpoint: T,
	params: FetchEndpointMap[T]['params'] = {}
): Promise<FetchEndpointMap[T]['return']> {
	const user = auth?.currentUser;
	if (!user) {
		throw new Error('User is not authenticated');
	}
	const token = await getIdToken(user);
	const res = await fetch(
		`${endpoint}?${new URLSearchParams(params as Record<string, string>).toString()}`,
		{
			method: 'GET',
			headers: new Headers({
				Authorization: `Bearer ${token}`
			})
		}
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
	params: PostEndpointMap[T]['params']
): Promise<PostEndpointMap[T]['return']> {
	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(params)
	});
	if (!res.status.toString(10).startsWith('2')) {
		throw new Error(res.status.toString());
	}

	const data = await res.text();
	if (data.length === 0) return null;
	else {
		try {
			return (await JSON.parse(data)) as PostEndpointMap[T]['return'];
		} catch (err) {
			throw new Error(`Failed to parse JSON from post to ${endpoint}. Error: ${err as string}`);
		}
	}
}
