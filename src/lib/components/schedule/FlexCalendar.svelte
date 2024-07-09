<script lang="ts">
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import { dateStore } from '@/stores/date';
	import dayjs, { type Dayjs } from 'dayjs';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import MdiArrowLeft from 'virtual:icons/mdi/arrow-left';
	import MdiArrowRight from 'virtual:icons/mdi/arrow-right';

	let days: dayjs.Dayjs[] = [];
	let flexSchedules: FlexSchedule[] = [];
	const currentMonthStore = writable(dayjs().startOf('month'));
	let fetchedMonths: dayjs.Dayjs[] = [];

	onMount(() => {
		currentMonthStore.subscribe(() => {
			days = getAllDays();
			fetchFlexSchedules();
		});
	});

	function fetchFlexSchedules() {
		const currentMonth = get(currentMonthStore);
		if (fetchedMonths.some((month) => month.isSame(currentMonth, 'month'))) return;
		const [start, end] = getCalendarRange();

		fetchEndpoint(ENDPOINTS.GET.Flex.GetScheduleRange, {
			startDate: start.format('YYYY-MM-DD'),
			endDate: end.format('YYYY-MM-DD')
		}).then((data) => {
			fetchedMonths.push(currentMonth);
			flexSchedules = [...data, ...flexSchedules];
			days = getAllDays();
		});
	}

	const getCalendarRange = () => [
		get(currentMonthStore).startOf('month').startOf('week'),
		get(currentMonthStore).endOf('month').endOf('week')
	];

	function getAllDays(): dayjs.Dayjs[] {
		const days: Dayjs[] = [];
		const [start, end] = getCalendarRange();
		let current = start;
		while (current.isBefore(end)) {
			days.push(current);
			current = current.add(1, 'day');
		}
		return days;
	}

	const isFlexDay = (day: dayjs.Dayjs) =>
		flexSchedules.some((schedule) => day.isSame(schedule.date, 'day'));
</script>

<div class="wrapper">
	<div class="month-picker">
		<button on:click={() => ($currentMonthStore = $currentMonthStore.subtract(1, 'month'))}>
			<MdiArrowLeft />
		</button>
		<h2>{$currentMonthStore.format('MMMM YYYY')}</h2>
		<button on:click={() => ($currentMonthStore = $currentMonthStore.add(1, 'month'))}>
			<MdiArrowRight />
		</button>
	</div>

	<div class="weekday-labels">
		<div class="weekday">Mon</div>
		<div class="weekday">Tue</div>
		<div class="weekday">Wed</div>
		<div class="weekday">Thu</div>
		<div class="weekday">Fri</div>
		<div class="weekday">Sat</div>
		<div class="weekday">Sun</div>
	</div>
	<div class="days">
		{#each days as day}
			<button
				class="day"
				class:active={$dateStore.isSame(day, 'day')}
				class:flexDay={isFlexDay(day)}
				class:faded={day.month() !== $currentMonthStore.month()}
				on:click={() => dateStore.selectDay(day)}
			>
				{day.format('D')}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper {
		max-width: 400px;
		background-color: var(--bg);
		border: 1px solid var(--border);
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		padding: 1rem;

		.month-picker {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1rem;

			button {
				background: none;
				border: none;
				cursor: pointer;
				font-size: 1rem;

				&:hover {
					color: var(--primary);
				}
			}
		}

		.weekday-labels {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 0.5rem;

			margin-bottom: 1rem;

			.weekday {
				display: flex;
				justify-content: center;
				align-items: center;

				padding: 0.5rem;
				border-radius: 0.5rem;
				background: var(--bg);
			}
		}

		.days {
			display: grid;
			grid-template-columns: repeat(7, 1fr);

			gap: 0.5rem;

			.day {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				padding: 1rem;

				border-radius: 0.5rem;
				background: var(--bg-secondary);
				border: none;
				outline: none;

				&.faded {
					color: var(--text-muted);
				}

				&.flexDay {
					background: red;
					color: white;
				}

				&.active {
					background: var(--primary);
					color: white;
				}
			}
		}
	}
</style>
