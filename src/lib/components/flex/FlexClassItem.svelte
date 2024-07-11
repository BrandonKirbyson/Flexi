<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';
	import { formatName } from '@/lib/util/name';

	export let flex: Flex;
</script>

<div class="grid-item">
	<!-- <div class="title">
		<span class="title-name">{flex.title}</span>
		<span class="title-dept">{flex.dept}</span>
	</div>
	<p>{JSON.stringify(flex)}</p> -->
	<span class="title">{flex.title}</span>
	<span class="teacher">{formatName(flex.teacher)}</span>
	<span class="dept">{flex.dept}</span>
	<span class="room">{flex.room}</span>
	<span class="seats">{flex.seats}</span>
</div>

<style lang="scss">
	.grid-item {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		grid-template-rows: 1fr;
		width: 100%;

		span {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.5rem;
			border-right: 1px solid var(--border);
		}
	}
</style>
