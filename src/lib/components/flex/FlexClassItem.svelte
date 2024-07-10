<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';

	export let flex: Flex;
</script>

<div class="flex-item">
	<div class="title">
		<span class="title-name">{flex.title}</span>
		<span class="title-dept">{flex.dept}</span>
	</div>
	<p>{JSON.stringify(flex)}</p>
</div>

<style lang="scss">
	.flex-item {
		margin: 1rem;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		// &-name {
		// 	font-size: 1.5rem;
		// }

		&-dept {
			font-size: 1rem;
			background-color: #ddd;
			border: none;
			color: black;
			padding: 10px 20px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			margin: 4px 2px;
			cursor: pointer;
			border-radius: 16px;
		}
	}
</style>
