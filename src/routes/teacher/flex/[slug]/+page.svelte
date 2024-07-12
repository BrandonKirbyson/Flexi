<script lang="ts">
	import type { ClassSchedule, FlexSchedule } from '@/lib/types/FlexSchedule';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import { teacherData } from '@/stores/user.js';
	import { get } from 'svelte/store';

	export let data;

	let schedule: FlexSchedule | null = null;
	let flex: ClassSchedule | null = null;

	$: data.date && fetchFlexSchedule();

	function fetchFlexSchedule() {
		fetchEndpoint(ENDPOINTS.GET.Flex.GetSchedule, { date: data.date.format('YYYY-MM-DD') }).then(
			(scheduleData) => {
				schedule = scheduleData;
				console.log(data.date.format('MMMM DD, YYYY'));
				const classId = get(teacherData)?.class;

				if (classId && schedule) {
					flex = schedule.classes[classId] || null;
				}
			}
		);
	}
</script>

<div class="wrapper">
	<h1 class="date">{data.date.format('MMMM DD, YYYY')}</h1>

	{#if schedule}
		<h1>Flex today</h1>
		{#if flex}
			<h2>Students: {flex.students.length}</h2>
		{:else}
			<h2>No Flex for you today</h2>
		{/if}
	{:else}
		<h1>No Flex!</h1>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
