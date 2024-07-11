<script lang="ts">
	import EditFlexDay from '@/lib/components/schedule/EditFlexDay.svelte';
	import FlexCalendar from '@/lib/components/schedule/FlexCalendar.svelte';
	import type { Dayjs } from 'dayjs';

	let date: Dayjs;
</script>

<div class="split-screen">
	<EditFlexDay />

	<div class="right-sidebar">
		<FlexCalendar bind:selectedDate={date} />
	</div>
</div>

<style lang="scss">
	.split-screen {
		height: 100%;
		width: 100%;
		padding: 1rem;
		display: flex;
		gap: 1rem;
	}

	.split-screen * {
		flex: 1;
	}

	.right-sidebar {
	}
</style>
