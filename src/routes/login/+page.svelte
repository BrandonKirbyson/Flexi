<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { session } from '../../stores/user';

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider)
			.then((result) => {
				const { displayName, email, photoURL, uid } = result?.user;
				session.set({
					loggedIn: true,
					user: {
						displayName,
						email,
						photoURL,
						uid
					}
				});

				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}
</script>

<div class="login-form">
	<h1>Login</h1>

	<button on:click={loginWithGoogle}>Login with Google</button>
</div>
