<script lang="ts">
	import { session } from '@/stores/user';
	import { onMount } from 'svelte';
	import type { Flex } from '../types/Flex';
	import { ENDPOINTS, fetchEndpoint } from '../util/endpoints';
	import FlexClassItem from './flex/FlexClassItem.svelte';

	let classes: Record<string, Flex> | undefined = undefined;
	async function getClasses() {
		if (classes) return;

		try {
			const res = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);
			classes = res;
		} catch (e) {
			console.error('Error fetching classes: ', e);
		}
	}

	onMount(() => {
		session.subscribe((s) => {
			if (!s.loading) getClasses();
		});
	});
</script>

<div class="wrapper">
	{#if !classes}
		<h1>Loading...</h1>
	{:else}
		{#each Object.entries(classes) as [id, flex]}
			<FlexClassItem {flex} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.wrapper {
		// display: flex;
		// flex-direction: column;
		height: 100%;
		overflow: scroll;
	}
</style>
