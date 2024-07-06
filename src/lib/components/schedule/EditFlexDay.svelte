<script lang="ts">
	import type dayjs from 'dayjs';

	export let selectedDate: dayjs.Dayjs;
</script>

<div class="wrapper">
	<h1>{selectedDate.format('MMMM D, YYYY')}</h1>

	<div class="actions">
		<button class="transfer">Transfer</button>
		<button class="delete">Delete</button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		background-color: var(--bg);
		padding: 1rem;
		border-radius: 1rem;
		border: 1px solid var(--border);

		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		.actions {
			margin-top: auto;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			button {
				border: none;
				cursor: pointer;
				font-size: 1rem;
				color: white;
				padding: 1rem;
				border-radius: 1rem;

				&.transfer {
					background: blue;
				}

				&.delete {
					background: red;
				}

				&:hover {
					transform: scale(1.05);
				}
			}
		}
	}
</style>
