<script lang="ts">
	import Header from './Header.svelte';
</script>

<div class="wrapper">
	<slot name="sidebar"></slot>

	<div class="content">
		<Header />
		<div class="content-wrapper">
			<slot class="slot" name="content"></slot>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		width: 100%;
		height: 100%;

		.content {
			overflow: hidden;

			&-wrapper {
				overflow: scroll;
				height: 100%;
			}

			:global(.content-wrapper > :first-child) {
				height: calc(100% - var(--header-height));
			}
		}

		div {
			flex: 1;
		}
	}
</style>
