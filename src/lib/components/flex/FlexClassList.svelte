<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import { DAY_FORMAT } from '@/lib/util/date';
	import { flexScheduleStore } from '@/stores/schedule';
	import { type Dayjs } from 'dayjs';
	import { onMount } from 'svelte';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';
	import FlexClassSearch from './FlexClassSearch.svelte';

	export let date: Dayjs;

	let classes: Record<string, Flex> = {};
	let filtered: string[] = [];

	let schedule: FlexSchedule | null;

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);
	});

	$: date && fetchSchedule();

	function fetchSchedule() {
		schedule = null;

		flexScheduleStore.subscribe((data) => {
			const s = data.get(date);
			if (typeof s === 'undefined') flexScheduleStore.load(date);
			else schedule = s;
		});
	}
</script>

<div class="wrapper">
	{date.format(DAY_FORMAT)}
	{#if schedule == null}
		<p>No schedule</p>
	{:else}
		<FlexClassSearch bind:filtered {classes} />
		{#each filtered as id}
			<FlexClassItem flex={classes[id]} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;
	}
</style>
