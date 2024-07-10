import type { Name } from '@/lib/types/User';
import { DAY_FORMAT } from '@/lib/util/date';
import { formatNameToName } from '@/lib/util/name';
import dayjs from 'dayjs';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import classes from '../../assets/schoolData/classes.json';
import teacherRooms from '../../assets/schoolData/teacherRooms.json';
import students from '../../assets/schoolData/users.json';
import { FlexType, deptNameToEnum, type Flex, type FlexDocument } from '../../types/Flex';
import { db } from '../firebase';

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
	if (!db) throw new Error('Firestore not initialized');

	const flexes: Record<string, Flex> = {};

	for (const course of classes.courses) {
		const uid = doc(collection(db, 'flex')).id;
		flexes[uid] = {
			type: FlexType.Class,
			title: course.courseNameOriginal,
			dept: deptNameToEnum(course.departmentName),
			// room: course.courseRoom,
			room: getCourseRoom({ first: course.stafferFirstName, last: course.stafferLastName }),
			teacher: formatNameToName({ first: course.stafferFirstName, last: course.stafferLastName }),
			seats: course.maxNumberStudents,
			students: {
				[dayjs().format(DAY_FORMAT)]: []
			}
		};
	}

	const flex: FlexDocument = {
		classes: flexes
	};

	const ref = doc(collection(db, 'flex'), 'classes');
	setDoc(ref, flex);
}

export function uploadUserData() {
	if (!db) throw new Error('Firestore not initialized');
	const batch = writeBatch(db);

	for (const student of students.students) {
		const ref = doc(collection(db, 'users'));
		batch.set(ref, { ...student, type: 'student' });
	}

	// for (const teacher of students.teachers) {
	// 	const ref = doc(collection(db, 'users'));
	// 	batch.set(ref, { ...teacher, type: 'teacher' });
	// }

	for (const teacher of students.admin) {
		const ref = doc(collection(db, 'users'));
		batch.set(ref, { ...teacher, type: 'admin' });
	}

	batch.commit();
}
