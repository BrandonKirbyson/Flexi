<script lang="ts">
	import type { ClassSchedule } from '@/lib/types/FlexSchedule';
	import { DAY_FORMAT } from '@/lib/util/date';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import { teacherData } from '@/stores/user';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	let flex: ClassSchedule | null = null;

	onMount(async () => {
		teacherData.subscribe(async (data) => {
			if (data) {
				const classId = data.class;
				if (!classId) return;
				flex =
					(
						await fetchEndpoint(ENDPOINTS.GET.Flex.GetSchedule, {
							date: dayjs().format(DAY_FORMAT)
						})
					)?.classes[classId] || null;
			} else {
				flex = null;
			}
		});
	});
</script>

<div class="wrapper">
	{#if flex}
		<h1>Flex today</h1>
		<p>Students: {flex.students.length}</p>
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
