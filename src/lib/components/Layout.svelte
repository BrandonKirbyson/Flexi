<script lang="ts">
</script>

<div class="wrapper">
	<slot name="sidebar"></slot>

	<div class="content">
		<!-- <div class="header-wrapper"> -->
		<slot name="header"></slot>
		<!-- </div> -->
		<div class="content-wrapper">
			<slot name="content"></slot>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		width: 100%;
		height: 100%;

		.content {
			// border: 5px solid green;
			// background-color: var(--bg-secondary);
			overflow: hidden;

			&-wrapper {
				overflow: scroll;
				height: 100%;
			}

			// display: flex;
			// flex-direction: column;
			// padding-bottom: 2rem;

			// .header-wrapper {
			// }
		}

		div {
			flex: 1;
		}
	}
</style>
