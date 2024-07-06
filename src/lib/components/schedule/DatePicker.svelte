<script lang="ts">
	import dayjs, { type Dayjs } from 'dayjs';
	import MdiArrowLeft from 'virtual:icons/mdi/arrow-left';
	import MdiArrowRight from 'virtual:icons/mdi/arrow-right';
	let currentMonth = dayjs().startOf('month');
	export let selectedDate = dayjs().startOf('day');
	let days: dayjs.Dayjs[] = [];

	export let activeDays: dayjs.Dayjs[] = [];

	$: currentMonth, (days = getAllDays());

	function selectDate(day: dayjs.Dayjs) {
		selectedDate = day;
	}

	function getAllDays() {
		let days: Dayjs[] = [];
		let current = currentMonth.startOf('month').startOf('week').add(1, 'day');
		let end = currentMonth.endOf('month').endOf('week').add(1, 'day');
		while (current.isBefore(end)) {
			days.push(current);
			current = current.add(1, 'day');
		}
		return days;
	}
</script>

<div class="wrapper">
	<div class="month-picker">
		<button on:click={() => (currentMonth = currentMonth.subtract(1, 'month'))}>
			<MdiArrowLeft />
		</button>
		<h2>{currentMonth.format('MMMM YYYY')}</h2>
		<button on:click={() => (currentMonth = currentMonth.add(1, 'month'))}>
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
				class:active={selectedDate && selectedDate === day}
				class:flexDay={activeDays.map((x) => x.startOf('day')).includes(day.startOf('day'))}
				class:faded={day.month() !== currentMonth.month()}
				on:click={() => selectDate(day)}
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
