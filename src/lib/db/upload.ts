import type { Name } from '@/lib/types/User';
import classes from '../assets/schoolData/classes.json';
import teacherRooms from '../assets/schoolData/teacherRooms.json';
import { FlexType, deptNameToEnum } from '../types/Flex';
import { db } from './index';
import { flexTable } from './schema';

function getCourseRoom(name: Name) {
	const arr = Object.entries(teacherRooms);
	return (arr.find(([key, value]) => {
		const split = key.split(' ');
		const fNameSplit = name.first.toLowerCase().split(' ');
		const lNameSplit = name.last.toLowerCase().split(' ');
		if (split[0] === fNameSplit[0] && split[split.length - 1] === lNameSplit[lNameSplit.length - 1])
			return value;
	}) || ['', 'Unknown'])[1].trim();
}

export function uploadClassData() {
	for (const course of classes.courses.slice(0, 5)) {
		db.insert(flexTable)
			.values({
				type: FlexType.Class,
				title: course.courseNameOriginal,
				dept: deptNameToEnum(course.departmentName),
				room: getCourseRoom({ first: course.stafferFirstName, last: course.stafferLastName }),
				teacherFirstName: course.stafferFirstName,
				teacherLastName: course.stafferLastName,
				seats: course.maxNumberStudents
			})
			.execute();
	}
}

// export function uploadUserData() {
// 	if (!db) throw new Error('Firestore not initialized');
// 	const batch = writeBatch(db);

// 	for (const student of students.students) {
// 		const ref = doc(collection(db, 'users'));
// 		batch.set(ref, { ...student, type: 'student' });
// 	}

// 	// for (const teacher of students.teachers) {
// 	// 	const ref = doc(collection(db, 'users'));
// 	// 	batch.set(ref, { ...teacher, type: 'teacher' });
// 	// }

// 	for (const teacher of students.admin) {
// 		const ref = doc(collection(db, 'users'));
// 		batch.set(ref, { ...teacher, type: 'admin' });
// 	}

// 	batch.commit();
// }
