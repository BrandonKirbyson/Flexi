<script lang="ts">
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
	import { session } from '../stores/user';

	function logout() {
		signOut(auth)
			.then(() => {
				session.set({
					loggedIn: false,
					user: null
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<div>Hello World</div>
<button on:click={logout}>Logout</button>
<a href="/student/flex">flex</a>

<style lang="scss">
</style>
