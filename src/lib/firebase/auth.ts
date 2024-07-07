import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import { getDocs, limit, query, where } from 'firebase/firestore';
import { adminData, session, studentData, teacherData } from '../../stores/user';
import type { AdminData } from '../types/Admin';
import type { StudentData, StudentUser } from '../types/Student';
import type { TeacherData } from '../types/Teacher';
import type { AuthUser } from '../types/User';
import { UserType } from '../types/UserType';
import { getUsersCollection } from './firebase';

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
	if (!user.email) throw new Error('User email not found');

	const q = query(getUsersCollection(), where('email', '==', user.email), limit(1));
	const docs = await getDocs(q);
	if (docs.empty) throw new Error('User not found');
	const docRef = docs.docs[0];
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
			session.update((s) => ({ ...s, userType }));
			break;
		}
		case UserType.Teacher: {
			const teacher: TeacherData = data as TeacherData;

			teacherData.set({
				...authUser,
				...teacher
			});

			session.update((s) => ({ ...s, userType }));
			break;
		}
		case UserType.Admin: {
			const admin: AdminData = data as AdminData;

			adminData.set({
				...authUser,
				...admin
			});
			session.update((s) => ({ ...s, userType }));
		}
	}
}
