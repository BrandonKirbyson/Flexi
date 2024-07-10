<script lang="ts">
	import dayjs from 'dayjs';
	import FlexCalendar from './FlexCalendar.svelte';

	const toggle = () => (showing = !showing);

	$: selectedDate = dayjs();
	$: showing = false;
</script>

<div class="wrapper">
	<button on:click={() => (selectedDate = selectedDate.subtract(1, 'day'))}>-</button>
	<span class="date">
		{selectedDate.format('dddd, MMMM D')}
	</span>
	<button on:click={() => (selectedDate = selectedDate.add(1, 'day'))}>+</button>

	<button on:click={toggle}>Show Calendar</button>
	<div class="calendar-wrapper" class:showing>
		<FlexCalendar bind:selectedDate miniMode={true} />
	</div>
</div>

<style lang="scss">
	.wrapper {
		user-select: none;

		.calendar-wrapper {
			display: none;
		}

		.calendar-wrapper.showing {
			display: block;
			position: absolute;
		}
	}
</style>
