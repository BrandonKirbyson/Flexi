<script lang="ts">
	import { onMount } from 'svelte';
	import type { Flex } from '../../types/Flex';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';
	import FlexClassSearch from './FlexClassSearch.svelte';

	let classTuple: [string, Flex][] = [];

	onMount(async () => {
		classTuple = Object.entries(await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses));
	});
</script>

<div class="wrapper">
	{#if !classTuple}
		<h1>Loading...</h1>
	{:else}
		<FlexClassSearch bind:classes={classTuple} />
		{#each classTuple as [_, flex]}
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
