import { formatFirebaseDate } from '@/lib/util/date';
import { formatNameToName } from '@/lib/util/name';
import dayjs from 'dayjs';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import classes from '../../assets/schoolData/classes.json';
import students from '../../assets/schoolData/users.json';
import { FlexType, deptNameToEnum, type Flex, type FlexDocument } from '../../types/Flex';
import { db } from '../firebase';

export function uploadClassData() {
	if (!db) throw new Error('Firestore not initialized');

	const flexes: Record<string, Flex> = {};

	for (const course of classes.courses) {
		const uid = doc(collection(db, 'flex')).id;
		flexes[uid] = {
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

	batch.commit();
}
