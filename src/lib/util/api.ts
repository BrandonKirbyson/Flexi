import type { RequestEvent } from '@sveltejs/kit';
import { adminAuth } from '../firebase/admin';
import { HttpStatusCode } from '../types/HttpStatus';
import type { FetchEndpointMap, FlattenedEndpoints, PostEndpointMap } from './endpoints';

export enum CacheType {
	NONE = '0',
	MINUTE = '60',
	FIVE_MINUTES = '300',
	HOUR = '3600',
	DAY = '86400',
	MONTH = '2592000',
	YEAR = '31536000'
}

async function verifyAuth(event: RequestEvent): Promise<boolean> {
	const authHeader = event.request.headers.get('Authorization');
	if (!authHeader) return false;
	const token = authHeader.split('Bearer ')[1];

	const decodedToken = await adminAuth.verifyIdToken(token);
	if (decodedToken.uid) return true;

	return false;
}

export async function apiFetch<T extends FlattenedEndpoints<'GET'>>(
	event: RequestEvent,
	fn: (params: FetchEndpointMap[T]['params']) => Promise<[FetchEndpointMap[T]['return'], number]>,
	cache: CacheType = CacheType.NONE
): Promise<Response> {
	const auth = await verifyAuth(event);
	if (!auth) return new Response(null, { status: HttpStatusCode.UNAUTHORIZED });

	const urlSearch = new URLSearchParams(event.request.url.split('?')[1]);
	const params = {
		...Object.fromEntries(urlSearch.entries())
	} as FetchEndpointMap[T]['params'];
	const [data, status] = await fn(params);

	const res = data == null ? null : JSON.stringify(data);
	return new Response(res, {
		status: status,
		headers: {
			'content-type': 'application/json',
			'cache-control': `public, max-age=${cache}`
		}
	});
}

export async function apiPost<T extends FlattenedEndpoints<'POST'>>(
	event: RequestEvent,
	fn: (params: PostEndpointMap[T]['params']) => Promise<[PostEndpointMap[T]['return'], number]>
): Promise<Response> {
	const params = (await event.request.json()) as PostEndpointMap[T]['params'];
	const [data, status] = await fn(params);
	const res = data == null ? null : JSON.stringify(data);
	return new Response(res, {
		status: status,
		headers: {
			'content-type': 'application/json'
		}
	});
}
