<script lang="ts">
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import dayjs, { type Dayjs } from 'dayjs';
	import { afterUpdate } from 'svelte';

	export let selectedDate: Dayjs;

	let schedule: FlexSchedule | null = null;

	afterUpdate(() => {
		fetchSchedule(selectedDate);
	});

	function fetchSchedule(date: Dayjs) {
		fetch(`/api/flex/getSchedule?date=${date.format('YYYY-MM-DD')}`)
			.then((res) => res.json())
			.then((data) => {
				schedule = data;
				console.log('fetched', schedule);
			});
	}

	function addSchedule() {
		fetch(`/api/flex/addFlex?date=${selectedDate.format('YYYY-MM-DD')}`, {
			method: 'POST'
		}).then(() => {
			fetchSchedule(selectedDate);
			console.log('added flex');
		});
	}

	function editFlex() {}

	function transferFlex(toDate: Dayjs): void {}

	function deleteFlex() {}
</script>

<div class="wrapper">
	<!-- {#await () => getClasses(selectedDate)}
		LOADING
	{:then schedule}
		{JSON.stringify(schedule)}
	{/await} -->
	<h1>{selectedDate.format('MMMM D, YYYY')}</h1>

	{#if schedule}
		<h1>Flex on this Day!</h1>
		<button on:click={deleteFlex}>Remove Flex</button>
	{:else}
		<button on:click={addSchedule}>Mark as Flex</button>
	{/if}

	<div class="actions">
		<button on:click={() => transferFlex(dayjs())} class="transfer">Transfer</button>
		<button on:click={deleteFlex} class="delete">Delete</button>
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
