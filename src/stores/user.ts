import { writable } from 'svelte/store';
import type { AdminUser } from '../lib/types/Admin';
import type { StudentUser } from '../lib/types/Student';
import type { TeacherUser } from '../lib/types/Teacher';
import type { SessionState } from '../lib/types/User';

export const session = writable<SessionState>({
	uid: null,
	email: null,
	loading: true
});

export const studentData = writable<StudentUser | null>(null);
export const teacherData = writable<TeacherUser | null>(null);
export const adminData = writable<AdminUser | null>(null);
