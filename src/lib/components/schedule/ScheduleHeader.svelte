<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { DAY_FORMAT } from '@/lib/util/date';
	import dayjs, { type Dayjs } from 'dayjs';
	import BxsLeftArrow from '~icons/bxs/left-arrow';
	import BxsRightArrow from '~icons/bxs/right-arrow';
	import MdiCalendar from '~icons/mdi/calendar';
	import FlexCalendar from './FlexCalendar.svelte';

	const toggle = () => {
		if (showing) goto(selectedDate.format(DAY_FORMAT));
		showing = !showing;
	};

	let selectedDate: Dayjs;

	$: slug = $page.url.pathname.split('/').pop();
	$: selectedDate = dayjs(slug ?? new Date());
	$: showing = false;
</script>

<div class="wrapper">
	<a href={selectedDate.subtract(1, 'day').format(DAY_FORMAT)}>
		<BxsLeftArrow />
	</a>
	<span class="date">
		{selectedDate.format('dddd, MMMM D')}
	</span>

	<button on:click={toggle}>
		<MdiCalendar />
	</button>
	<div class="calendar-wrapper" class:showing>
		<FlexCalendar bind:selectedDate miniMode={true} />
	</div>

	<a href={selectedDate.add(1, 'day').format(DAY_FORMAT)}>
		<BxsRightArrow />
	</a>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;

		user-select: none;

		.calendar-wrapper {
			display: none;
		}

		.calendar-wrapper.showing {
			display: block;
			position: absolute;
			top: 4rem;
		}

		span {
			text-align: center;
		}

		a {
			text-decoration: none;
			color: var(--text);
			padding: 0.5rem;
			display: flex;
			align-items: center;
			border-radius: 0.5rem;

			&:hover {
				background-color: var(--bg-secondary);
				outline: 1px solid var(--border);
			}
		}

		button {
			background: none;
			border: none;
			cursor: pointer;
			color: var(--primary);
			font-size: 1rem;
			display: flex;
			align-items: center;
			border-radius: 0.5rem;
			padding: 0.5rem;
			background-color: var(--bg-secondary);
			border: 1px solid var(--border);
		}
	}
</style>
