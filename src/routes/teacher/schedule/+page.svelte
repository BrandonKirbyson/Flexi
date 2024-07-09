<script lang="ts">
</script>

<div class="split-screen">
	Left Content

	<div class="right-sidebar">Right Sidebar Content</div>
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
