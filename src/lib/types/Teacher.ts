import type { AuthUser, BaseUser } from './User';

export interface TeacherData extends BaseUser {
	class: string;
}

export interface TeacherUser extends TeacherData, AuthUser {}
