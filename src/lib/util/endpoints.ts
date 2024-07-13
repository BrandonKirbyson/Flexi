import { getIdToken } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import type { Flex, FlexFormProps, FlexType } from '../types/Flex';
import type { FlexSchedule } from '../types/FlexSchedule';
import type { Flatten, Implements, PrimativeOrNull, ValueOf } from '../types/Util';

export const ENDPOINTS = {
	GET: {
		Flex: {
			GetSchedule: '/api/flex/getSchedule',
			GetClasses: '/api/flex/getClasses',
			GetScheduleRange: '/api/flex/getScheduleRange'
		}
	},
	POST: {
		Flex: {
			AddSchedule: '/api/flex/addSchedule',
			DeleteSchedule: '/api/flex/deleteSchedule',
			ScheduleStudent: '/api/flex/scheduleStudent',
			AddFeaturedFlex: '/api/flex/addFeaturedFlex'
		},
		UploadImage: '/api/uploadImage'
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
		[ENDPOINTS.GET.Flex.GetScheduleRange]: {
			return: FlexSchedule[];
			params: {
				startDate: string;
				endDate: string;
				limit?: string;
			};
		};
		[ENDPOINTS.GET.Flex.GetClasses]: {
			return: Record<string, Flex<FlexType.Featured> | Flex>;
			params: {
				type?: FlexType;
			};
		};
	}
>;

export type PostEndpointMap = Implements<
	EndpointMapType<'POST'>,
	{
		[ENDPOINTS.POST.Flex.AddSchedule]: {
			return: FlexSchedule | null;
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
		[ENDPOINTS.POST.Flex.ScheduleStudent]: {
			return: null;
			params: {
				date: string;
				flexId: string;
				studentId: string;
			};
		};
		[ENDPOINTS.POST.Flex.AddFeaturedFlex]: {
			return: Flex | null;
			params: FlexFormProps;
		};
		[ENDPOINTS.POST.UploadImage]: {
			return: string | null;
			params: {
				bytes: Uint8Array;
			};
		};
	}
>;

type EndpointKey = PrimativeOrNull | Blob | Uint8Array | ArrayBuffer | ArrayBufferView;

// Trying to inline this breaks typescript 💀
type X<T extends keyof typeof ENDPOINTS> = ValueOf<Flatten<(typeof ENDPOINTS)[T]>>;
export type EndpointMapType<T extends keyof typeof ENDPOINTS> = {
	[prop in T extends 'GET' ? X<'GET'> : X<'POST'>]: {
		return: unknown;
		params: T extends 'GET'
			? Record<string, EndpointKey> | EmptyObject | object
			: Record<string, EndpointKey> | object;
	};
};

export type FlattenedEndpoints<T extends keyof typeof ENDPOINTS> = ValueOf<
	Flatten<(typeof ENDPOINTS)[T]>
>;

export async function fetchEndpoint<T extends FlattenedEndpoints<'GET'>>(
	endpoint: T,
	params: FetchEndpointMap[T]['params'] = {},
	fetchFn = fetch
): Promise<FetchEndpointMap[T]['return']> {
	const user = auth?.currentUser;
	if (!user) {
		throw new Error('User is not authenticated');
	}
	const token = await getIdToken(user);
	const res = await fetchFn(
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

// fetchFn allows for dependency injection via event.fetch +server.ts files
export async function postEndpoint<T extends FlattenedEndpoints<'POST'>>(
	endpoint: T,
	params: PostEndpointMap[T]['params'],
	fetchFn = fetch
): Promise<PostEndpointMap[T]['return']> {
	const user = auth?.currentUser;
	if (!user) {
		throw new Error('User is not authenticated');
	}
	const token = await getIdToken(user);
	const res = await fetchFn(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
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
