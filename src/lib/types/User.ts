import type { UserType } from './UserType';

export interface AuthUser {
	uid: string;
	profileUrl: string | null;
}

export interface BaseUser {
	email: string;
	name: Name;
}

export interface Name {
	first: string;
	last: string;
}

export interface SessionState {
	uid: string | null;
	email: string | null;
	loading: boolean;
	userType?: UserType;
}
