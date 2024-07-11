<script lang="ts">
	import { page } from '$app/stores';

	$: route = $page.url.pathname;
</script>

<div class="sidebar-wrapper">
	<div class="logo">
		<div class="logo-pic"></div>
		<h1>Flexi {route}</h1>
	</div>
	<div class="tabs">
		<slot />
	</div>
</div>

<style lang="scss">
	.button-wrapper {
		display: flex;
		height: 40px;
		align-items: center;
		justify-content: flex-start;

		.icon-wrapper {
			height: 30px;
			margin-right: 0.5rem;
		}
	}

	.sidebar-wrapper {
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		min-height: 100%;

		min-width: 20rem;

		border: none;
		border-right: 2px solid var(--border);

		z-index: 10;

		.logo {
			display: flex;
			justify-content: flex-start;
			padding: 1rem;
			align-items: center;

			.logo-pic {
				background-color: var(--primary);
				border-radius: 50%;
				height: 2.5rem;
				width: 2.5rem;
			}

			h1 {
				font-family: var(--logo-font);
				color: var(--text);
				font-size: 2rem;
				padding-left: 0.5rem;
			}
		}

		.divider {
			background-color: var(--border);
			height: 4px;
			margin-top: -2px;
			margin-left: 5%;
			width: 90%;
		}

		.tabs {
			flex: 1 1 0;
			display: flex;
			flex-direction: column;

			padding: 1rem;

			button {
				background-color: transparent;
				border: none;
				color: var(--text);
				padding: 0.6rem;
				cursor: pointer;

				text-align: left;

				border-radius: 0.5rem;

				margin-bottom: 0.5rem;

				transition:
					background-color 100ms ease-in-out,
					color 100ms ease-in-out;

				&.active {
					background-color: var(--primary);
					color: white;
				}

				&:hover:not(.active) {
					color: var(--primary);
				}
			}

			button:last-child {
				margin-top: auto;
				margin-bottom: 0;
			}
		}
	}
</style>
