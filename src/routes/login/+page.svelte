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
	<form method="POST" action="/login">
		<!-- <label>
			Email
			<input name="email" type="email" />
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		<button>Login</button>
		<button formaction="?/signup">Sign up</button> -->
		<button type="submit">Login with Google</button>
	</form>
</div>
