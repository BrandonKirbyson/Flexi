import type { UserType } from './UserType';

export interface AuthUser {
	uid: string;
	profileUrl: string | null;
}

export interface SessionState {
	uid: string | null;
	loading: boolean;
	userType?: UserType;
}
