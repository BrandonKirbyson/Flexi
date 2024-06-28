import type { AuthUser } from './User';
import type { Name } from './Util';

export interface TeacherData {
	email: string;
	name: Name;
	class: string;
}

export interface TeacherUser extends TeacherData, AuthUser {}
