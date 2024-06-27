import { session } from '@/stores/user';
import { onAuthStateChanged, type Auth } from 'firebase/auth';

export function initAuth(auth: Auth) {
	onAuthStateChanged(auth, (user) => {
		session.set({
			user,
			loading: false
		});
	});
}
