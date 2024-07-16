<script lang="ts">
	import type { FlexClasses } from '@/lib/types/Flex';
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import { DAY_FORMAT } from '@/lib/util/date';
	import { session } from '@/stores/user';
	import dayjs, { type Dayjs } from 'dayjs';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';
	import FlexClassItem from './FlexClassItem.svelte';
	import FlexClassSearch from './FlexClassSearch.svelte';

	export let date: Dayjs;

	let classes: FlexClasses = {};
	let filtered: string[] = [];

	let schedule: FlexSchedule | null = null;
	let nextFlex: FlexSchedule | null = null;
	$: nextFlexDate = nextFlex ? dayjs(nextFlex.date) : null;

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);
	});

	$: date && fetchSchedule();

	async function fetchSchedule() {
		schedule = null;

		// flexScheduleStore.subscribe((data) => {
		// 	const s = data.get(date);
		// 	if (typeof s === 'undefined') flexScheduleStore.load(date);
		// 	else schedule = s;
		// });

		// nextFlex = (
		// 	await fetchEndpoint(ENDPOINTS.GET.Flex.GetScheduleRange, {
		// 		startDate: date.format(DAY_FORMAT),
		// 		endDate: date.add(1, 'year').format(DAY_FORMAT),
		// 		limit: '1'
		// 	})
		// )[0];
	}
</script>

<div class="wrapper">
	{#if schedule !== null}
		<div class="no-flex">
			<h1>No flex today!</h1>
			{#if nextFlex && nextFlexDate}
				<h1>
					Jump to the next flex, <a href={`${nextFlexDate.format(DAY_FORMAT)}`}
						>{nextFlexDate.format('dddd, MMMM DD')}</a
					>
				</h1>
			{/if}
		</div>
	{:else}
		<FlexClassSearch bind:filtered {classes} />
		{#each filtered as id}
			<FlexClassItem
				flex={classes[id]}
				{id}
				{date}
				scheduled={schedule.classes[id].students.includes(get(session).uid ?? '')}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;

		.no-flex {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			height: 100%;

			h1 {
				font-size: 1.5rem;
				color: var(--text-secondary);

				a {
					color: var(--primary);
					text-decoration: none;
					background-color: var(--border);
					padding: 0.5rem;
					font-size: 1.5rem;
					border-radius: 0.5rem;

					&:hover {
						background-color: var(--secondary);
					}
				}
			}
		}
	}
</style>
