import { FlexDept, FlexType, type Flex } from '@/lib/types/Flex';

// export const isStudent = (user: BaseUser): user is BaseUser & { studentData: StudentData } => {
// 	return (user as BaseUser & { studentData: StudentData }).studentData !== undefined;
// };

// export const isTeacher = (user: BaseUser): user is BaseUser & { teacherData: TeacherData } => {
// 	return (user as { teacherData: TeacherData }).teacherData !== undefined;
// };

// export const isAdmin = (user: BaseUser): user is BaseUser & { adminData: AdminData } => {
// 	return (user as { adminData: AdminData }).adminData !== undefined;
// };

function allKeysOverlap<T extends object, K extends object>(obj1: T, obj2: K): boolean {
	return Object.keys(obj1).every((key) => key in obj2);
}

const isType = <T extends object>(type: T, value: unknown): value is T => {
	if (typeof value !== 'object') return false;
	if (value === null) return false;

	return allKeysOverlap(type, value);
};

export function isFlexClass(value: unknown): value is Flex {
	const dummyFlexClass: Flex = {
		type: FlexType.Class,
		title: '',
		room: '',
		teacher: {
			first: '',
			last: ''
		},
		dept: FlexDept.Math,
		seats: 0,
		students: {}
	};

	return isType(dummyFlexClass, value);
}

// export function validUserStore(
// 	user: Writable<StudentOrTeacher | null>
// ): user is Writable<StudentOrTeacher> {
// 	if (!user) return false;
// 	const usr = get(user);
// 	if (!usr) return false;
// 	return validUser(usr);
// }

// export function validUser(user: StudentOrTeacher | null): user is CurrentStudent | CurrentTeacher {
// 	if (!user) return false;
// 	const dummyStudent: StudentOrTeacher = {
// 		email: '',
// 		name: {
// 			first: '',
// 			last: ''
// 		},
// 		year: 0,
// 		classes: [],
// 		favoriteClasses: [],
// 		profile: '',
// 		id: ''
// 	};
// 	return isType<StudentOrTeacher>(dummyStudent, user);
// }
