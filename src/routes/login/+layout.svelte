<script lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { session } from '@stores/user';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	let loading = true;
	let loggedIn = false;

	session.subscribe((cur) => {
		loading = cur?.loading || false;
		loggedIn = cur?.loggedIn || false;
	});

	onMount(async () => {
		const user = await data.getAuthUser();

		const loggedIn = !!user && user?.emailVerified;
		session.update((cur) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});

		if (loggedIn) goto('/');
	});
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div>
		<slot />
	</div>
{/if}
