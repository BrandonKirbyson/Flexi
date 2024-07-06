<script lang="ts">
	import Header from './Header.svelte';
</script>

<div class="wrapper">
	<slot name="sidebar"></slot>

	<div class="content">
		<Header />
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

			display: flex;
			flex-direction: column;
			padding-bottom: 2rem;
		}

		div {
			flex: 1;
		}
	}
</style>
