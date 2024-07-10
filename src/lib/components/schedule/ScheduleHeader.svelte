<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { DAY_FORMAT } from '@/lib/util/date';
	import dayjs, { type Dayjs } from 'dayjs';
	import FlexCalendar from './FlexCalendar.svelte';

	const toggle = () => {
		if (showing) {
			console.log(selectedDate.format(DAY_FORMAT));
			goto(selectedDate.format(DAY_FORMAT));
		}
		showing = !showing;
	};

	let selectedDate: Dayjs;

	$: slug = $page.url.pathname.split('/').pop();
	$: selectedDate = dayjs(slug || new Date());
	$: showing = false;
</script>

<div class="wrapper">
	<a href={selectedDate.subtract(1, 'day').format(DAY_FORMAT)}>Prev</a>
	<span class="date">
		{selectedDate.format('dddd, MMMM D')}
	</span>
	<a href={selectedDate.add(1, 'day').format(DAY_FORMAT)}>Next</a>

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
