<script lang="ts">
	import { auth } from '$lib/firebase/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { session } from '../../stores/user';

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		if (!auth) return;
		await signInWithPopup(auth, provider)
			.then((result) => {
				const { uid } = result?.user;
				session.set({
					uid,
					loading: false
				});
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
