<script lang="ts">
	import { page } from '$app/stores';
	import MdiStore24Hour from 'virtual:icons/mdi/store-24-hour';

	$: title = $page.url.pathname.split('/').pop() || 'Home';
</script>

<div class="wrapper">
	<span>{title}</span>

	<div class="right-items">
		<div class="settings">
			<MdiStore24Hour color="var(--primary)" font-size="2rem" />
		</div>
	</div>
</div>

<style lang="scss">
	.skeleton {
		animation: skeleton-loading 1s linear infinite alternate;
		width: 30ch !important;
		display: block;
	}

	@keyframes skeleton-loading {
		0% {
			background-color: hsl(200, 20%, 80%);
		}
		100% {
			background-color: hsl(200, 20%, 95%);
		}
	}

	.skeleton-text {
		width: 100%;
		height: 0.7rem;
		margin-bottom: 0.5rem;
		border-radius: 0.25rem;
	}

	.wrapper {
		padding-left: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		background-color: var(--bg);
		height: 5rem;
		border-bottom: 2px solid var(--border);

		h1 {
			color: var(--text);
			font-family: var(--font);
			text-align: left;
			padding: 1rem;
			max-height: 80px;
		}

		.right-items {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 1rem;
			height: 100%;

			.settings {
				color: var(--text-secondary);
				width: 2rem;
				height: 2rem;
				margin-right: 1rem;
			}

			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				margin-right: 0.5rem;
			}

			span {
				color: var(--text);
				font-family: var(--font);
				font-size: 1.2rem;
			}
		}
	}
</style>
