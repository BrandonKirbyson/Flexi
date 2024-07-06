<script>
	import DatePicker from '@/lib/components/schedule/DatePicker.svelte';
	import EditFlexDay from '@/lib/components/schedule/EditFlexDay.svelte';
	import dayjs from 'dayjs';

	let selectedDate = dayjs().startOf('day');
</script>

<div class="split-screen">
	<EditFlexDay {selectedDate} />

	<div class="right-sidebar">
		<DatePicker bind:selectedDate />
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
