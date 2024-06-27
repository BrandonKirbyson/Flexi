<script lang="ts">
	import { auth } from '$lib/firebase/firebase';
	import { signOut } from 'firebase/auth';

	async function logout() {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div>Hello World</div>
<button on:click={logout}>Logout</button>
<a href="/student/flex">flex</a>

<style lang="scss">
</style>
