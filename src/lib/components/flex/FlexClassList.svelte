<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import { type Dayjs } from 'dayjs';
	import { onMount } from 'svelte';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';
	import FlexClassSearch from './FlexClassSearch.svelte';

	export let date: Dayjs;

	let classes: Record<string, Flex> = {};
	let filtered: string[] = [];

	let schedule: FlexSchedule | null = null;

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);

		// get schedule from a store that uses the onsnapshot
		// below is temporary
		schedule = await fetchEndpoint(ENDPOINTS.GET.Flex.GetSchedule, {
			date: date.format('YYYY-MM-DD')
		});
	});
</script>

<div class="wrapper">
	{#if schedule}
		<FlexClassSearch bind:filtered {classes} />
		{#each filtered as id}
			<FlexClassItem flex={classes[id]} />
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;
	}
</style>
