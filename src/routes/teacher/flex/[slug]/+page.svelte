<script lang="ts">
	import type { ClassSchedule, FlexSchedule } from '@/lib/types/FlexSchedule';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import { dateStore } from '@/stores/date';
	import { teacherData } from '@/stores/user.js';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let schedule: FlexSchedule | null;
	let flex: ClassSchedule | null = null;

	onMount(() => {
		fetchFlexSchedule();
	});

	function fetchFlexSchedule() {
		fetchEndpoint(ENDPOINTS.GET.Flex.GetSchedule, { date: $dateStore.format('YYYY-MM-DD') }).then(
			(data) => {
				schedule = data;
				const teacherId = get(teacherData)?.uid;
				if (teacherId && schedule) {
					flex = Object.values(schedule.classes).find((c) => c.teacher === teacherId) || null;
				}
			}
		);
	}
</script>

<div class="wrapper">
	<h1 class="date">{$dateStore.format('MMMM DD, YYYY')}</h1>

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
