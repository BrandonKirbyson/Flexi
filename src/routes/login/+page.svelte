<script lang="ts">
	async function loginWithGoogle() {
		// const { error } = await supabase.auth.signInWithPopup();
		// const provider = new GoogleAuthProvider();
		// if (!auth) return;
		// await signInWithPopup(auth, provider)
		// 	.then((result) => {
		// 		const { uid } = result?.user;
		// 		session.set({
		// 			uid,
		// 			loading: false
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		return error;
		// 	});
	}
</script>

<div class="login-form">
	<h1>Login</h1>

	<button on:click={loginWithGoogle}>Login with Google</button>
</div>
