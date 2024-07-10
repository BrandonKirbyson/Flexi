<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';
	import { onMount } from 'svelte';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';
	import FlexClassSearch from './FlexClassSearch.svelte';

	let classTuple: [string, Flex][] = [];

	// async function getClasses() {
	// 	classTuple = Object.entries(await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses));
	// }

	let loaded = false;
	onMount(async () => {
		classTuple = Object.entries(await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses));
		loaded = true;
	});
</script>

<div class="wrapper">
	{#if !loaded}
		<p>LOADING</p>
	{:else}
		<FlexClassSearch bind:classes={classTuple} />
		{#each classTuple as [_, flex]}
			<FlexClassItem {flex} />
		{/each}
	{/if}

	<!-- {#await getClasses()}
		LOADING
	{:then _}
		<FlexClassSearch bind:classes={classTuple} />
		{#each classTuple as [_, flex]}
			<FlexClassItem {flex} />
		{/each}
	{/await} -->
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;
	}
</style>
