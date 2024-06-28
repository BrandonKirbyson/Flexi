<script lang="ts">
	import { auth } from '@/lib/firebase/firebase';
	import { signOut } from 'firebase/auth';
</script>

<div>
	<button on:click={() => signOut(auth)}>Logout</button>
</div>

<style lang="scss">
</style>
