<script lang="ts">
	import FlexCalendar from '@/lib/components/schedule/FlexCalendar.svelte';
	import type { Dayjs } from 'dayjs';

	let date: Dayjs;
</script>

<div>
	<h1>Admin Dashboard</h1>

	<FlexCalendar bind:selectedDate={date} />
</div>
