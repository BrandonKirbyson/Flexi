<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';
	import { onMount } from 'svelte';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';
	import FlexClassSearch from './FlexClassSearch.svelte';

	let classes: Record<string, Flex> = {};
	let filtered: string[] = [];

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);
	});
</script>

<div class="wrapper">
	<FlexClassSearch bind:filtered {classes} />
	{#each filtered as id}
		<FlexClassItem flex={classes[id]} />
	{/each}
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;
	}
</style>
