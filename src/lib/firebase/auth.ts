import { adminData, session, studentData, teacherData } from '@/stores/user';
import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import { CollectionReference, collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { AdminData } from '../types/Admin';
import type { StudentData, StudentUser } from '../types/Student';
import type { TeacherData } from '../types/Teacher';
import type { AuthUser } from '../types/User';
import { UserType } from '../types/UserType';
import type { ValueOf } from '../types/Util';
import { db } from './firebase';

export function initAuth(auth: Auth) {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			session.set({
				uid: user.uid,
				loading: false
			});

			fetchCurrentUserData(user);
		} else {
			session.set({
				uid: null,
				loading: false
			});
		}
	});
}

async function fetchCurrentUserData(user: User) {
	type Union = StudentData & TeacherData & AdminData;
	if (!db) throw new Error('Firestore not initialized');
	const userCollection = collection(db, 'users') as CollectionReference<{
		[_ in keyof (Union & { type: string })]: ValueOf<Union> | UserType;
	}>;

	if (!user.email) throw new Error('User email not found');

	const q = query(userCollection, where('email', '==', user.email), limit(1));
	const docRef = (await getDocs(q)).docs[0];
	if (!docRef.exists()) throw new Error('User not found');

	const userType = docRef.data().type as UserType;
	const { type: _, ...data } = docRef.data();

	const authUser: AuthUser = {
		uid: user.uid,
		profileUrl: user.photoURL
	};

	switch (userType) {
		case UserType.Student: {
			const student: StudentData = data as StudentData;

			studentData.set({
				...authUser,
				...student
			} as StudentUser);
			break;
		}
		case UserType.Teacher: {
			const teacher: TeacherData = data as TeacherData;

			teacherData.set({
				...authUser,
				...teacher
			});
			break;
		}
		case UserType.Admin: {
			const admin: AdminData = data as AdminData;

			adminData.set({
				...authUser,
				...admin
			});
		}
	}
}
