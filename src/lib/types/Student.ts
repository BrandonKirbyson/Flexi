import type { AuthUser, BaseUser } from './User';

export interface StudentData extends BaseUser {
	year: number;
	classes: string[];
	favoriteClasses: string[];
}

export interface StudentUser extends StudentData, AuthUser {}
