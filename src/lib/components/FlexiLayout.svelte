<script lang="ts">
	import FlexiHeader from './FlexiHeader.svelte';
</script>

<div class="wrapper">
	<slot name="sidebar"></slot>

	<div class="content">
		<FlexiHeader />
		<slot name="content"></slot>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		width: 100%;
		height: 100%;

		.content {
			background-color: var(--bg-secondary);
			overflow: hidden;
		}

		div {
			flex: 1;
		}
	}
</style>
