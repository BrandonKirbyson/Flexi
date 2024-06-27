<script lang="ts">
	import { signOut } from 'firebase/auth';
</script>

<div>
	<button on:click={() => signOut}>Logout</button>
</div>

<style lang="scss">
</style>
