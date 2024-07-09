<script lang="ts">
	import EditFlexDay from '@/lib/components/schedule/EditFlexDay.svelte';
	import DatePicker from '@/lib/components/schedule/FlexCalendar.svelte';
</script>

<div class="split-screen">
	<EditFlexDay />

	<div class="right-sidebar">
		<DatePicker />
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
