import classes from '$lib/assets/schoolData/classes.json';
import students from '$lib/assets/schoolData/users.json';
import { FlexType, deptNameToEnum, type Flex } from '@/lib/types/Flex';
import { formatFirebaseDate } from '@/lib/util/date';
import { formatNameToName } from '@/lib/util/name';
import dayjs from 'dayjs';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

export function uploadClassData() {
	if (!db) throw new Error('Firestore not initialized');
	const batch = writeBatch(db);

	for (const course of classes.courses) {
		const ref = doc(collection(db, 'classes'));
		const flex: Flex = {
			type: FlexType.Class,
			title: course.courseNameOriginal,
			dept: deptNameToEnum(course.departmentName),
			room: course.courseRoom,
			teacher: formatNameToName({ first: course.stafferFirstName, last: course.stafferLastName }),
			seats: course.maxNumberStudents,
			students: {
				[formatFirebaseDate(dayjs())]: []
			}
		};
		batch.set(ref, flex);
	}

	batch.commit();
}

export function uploadUserData() {
	if (!db) throw new Error('Firestore not initialized');
	const batch = writeBatch(db);

	for (const student of students.students) {
		const ref = doc(collection(db, 'users'));
		batch.set(ref, { ...student, type: 'student' });
	}

	batch.commit();
}
