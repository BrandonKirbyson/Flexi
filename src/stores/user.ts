import { writable } from 'svelte/store';

type AuthUser = {
	email?: string | null;
	displayName?: string | null;
	photoURL?: string | null;
	uid?: string | null;
};

export type SessionState = {
	user: AuthUser | null;
	loading: boolean;
};

export const session = writable<SessionState>({
	user: null,
	loading: true
});
