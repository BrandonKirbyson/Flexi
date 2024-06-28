import type { UserType } from './UserType';
import type { Name } from './Util';

export interface AuthUser {
	uid: string;
	profileUrl: string | null;
}

export interface BaseUser {
	email: string;
	name: Name;
}

export interface SessionState {
	uid: string | null;
	loading: boolean;
	userType?: UserType;
}
