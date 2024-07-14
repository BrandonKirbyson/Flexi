import type { Name } from '@/lib/types/User';
import classes from '../assets/schoolData/classes.json';
import teacherRooms from '../assets/schoolData/teacherRooms.json';
import { type Flex, type FlexDocument } from '../types/Flex';
import { db } from './index';
import { testTable } from './schema';

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

export async function uploadClassData() {
	const a = await db.select().from(testTable);
	console.log('DATA', a);
	// if (!db) throw new Error('Firestore not initialized');

	const flexes: Record<string, Flex> = {};

	for (const course of classes.courses.slice(0, 5)) {
		db.insert(testTable)
			.values({
				name: course.courseNameOriginal
			})
			.execute();
		console.log('inserted');
		// const uid = doc(collection(db, 'flex')).id;
		// db.insert(flexTable).values({
		// 	// id: 'udiaojsa',
		// 	type: FlexType.Class,
		// 	title: course.courseNameOriginal,
		// 	dept: deptNameToEnum(course.departmentName),
		// 	// room: course.courseRoom,
		// 	room: getCourseRoom({ first: course.stafferFirstName, last: course.stafferLastName }),
		// 	teacher: formatNameToName({ first: course.stafferFirstName, last: course.stafferLastName }),
		// 	seats: course.maxNumberStudents,
		// 	students: {
		// 		[dayjs().format(DAY_FORMAT)]: []
		// 	}
		// });
	}

	const flex: FlexDocument = {
		classes: flexes
	};

	// const ref = doc(collection(db, 'flex'), 'classes');
	// setDoc(ref, flex);
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
