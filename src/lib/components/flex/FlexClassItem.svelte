<script lang="ts">
	import type { Flex, FlexType } from '@/lib/types/Flex';
	import { DAY_FORMAT } from '@/lib/util/date';
	import { ENDPOINTS, postEndpoint } from '@/lib/util/endpoints';
	import { formatName } from '@/lib/util/name';
	import { session } from '@/stores/user';
	import type { Dayjs } from 'dayjs';
	import { get } from 'svelte/store';

	export let flex: Flex<FlexType.Class> | Flex<FlexType.Featured>;
	export let id: string;
	export let date: Dayjs;
	export let scheduled = false;
	export let featured = false;

	function schedule() {
		const studentId = get(session).uid;
		if (!studentId) return;
		postEndpoint(ENDPOINTS.POST.Flex.ScheduleStudent, {
			date: date.format(DAY_FORMAT),
			flexId: id,
			studentId: studentId
		});
	}
</script>

<div class="grid-item">
	<span class="title">{flex.title}</span>
	<span class="teacher">{formatName(flex.teacher)}</span>
	{#if !featured}
		<span class="dept">{flex.dept}</span>
	{/if}

	<span class="room">{flex.room}</span>
	<span class="seats">{flex.seats}</span>
	<button on:click={schedule} class:disabled={scheduled}>Schedule</button>
</div>

<style lang="scss">
	.grid-item {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		grid-template-rows: 1fr;
		width: 100%;

		span {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.5rem;
			border-right: 1px solid var(--border);
		}

		button {
			margin: 1rem;
			background: none;
			border: none;
			cursor: pointer;
			font-size: 1rem;
			padding: 0.5rem;
			border-radius: 0.5rem;
			background-color: var(--primary);
			color: var(--bg);

			&:hover {
				outline: 1px solid var(--border);
			}

			&.disabled {
				background-color: var(--text-muted);
				color: var(--text);
				cursor: not-allowed;
			}
		}
	}
</style>
