import type { AuthUser } from './User';
import type { Name } from './Util';

export interface StudentData {
	email: string;
	name: Name;
	year: number;
	classes: string[];
	favoriteClasses: string[];
}

export interface StudentUser extends StudentData, AuthUser {}
