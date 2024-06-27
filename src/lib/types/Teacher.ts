import type { Name } from './Util';

export default interface Teacher {
	teacherId: number;
	email: string;
	name: Name;
}

export interface CurrentTeacher extends Teacher {
	profile: string;
	id: string;
}
