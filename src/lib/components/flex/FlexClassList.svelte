<script lang="ts">
	import { onMount } from 'svelte';
	import type { Flex } from '../../types/Flex';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';

	let classes: Record<string, Flex>;

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);
	});
</script>

<div class="wrapper">
	{#if !classes}
		<h1>Loading...</h1>
	{:else}
		{#each Object.values(classes) as flex}
			<FlexClassItem {flex} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;
	}
</style>
