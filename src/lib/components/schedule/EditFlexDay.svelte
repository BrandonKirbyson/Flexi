<script lang="ts">
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import { ENDPOINTS, fetchEndpoint, postEndpoint } from '@/lib/util/endpoints';
	import { dateStore } from '@/stores/date';
	import dayjs, { type Dayjs } from 'dayjs';
	import { onMount } from 'svelte';

	let schedule: FlexSchedule | null = null;

	// const dateStore = writable(selectedDate);
	// $: dateStore.set(selectedDate);

	onMount(() => {
		dateStore.subscribe(() => {
			fetchSchedule();
		});
	});

	function fetchSchedule() {
		fetchEndpoint(ENDPOINTS.GET.Flex.GetSchedule, { date: $dateStore.format('YYYY-MM-DD') }).then(
			(data) => {
				schedule = data;
			}
		);
	}

	function addSchedule() {
		postEndpoint(ENDPOINTS.POST.Flex.AddSchedule, {
			date: $dateStore.format('YYYY-MM-DD')
		}).then((data) => {
			schedule = data;
		});
	}

	function transferFlex(toDate: Dayjs): void {}

	function deleteFlex() {
		postEndpoint(ENDPOINTS.POST.Flex.DeleteSchedule, {
			date: $dateStore.format('YYYY-MM-DD')
		}).then(() => {
			schedule = null;
		});
	}
</script>

<div class="wrapper">
	<h1>{$dateStore.format('MMMM DD, YYYY')}</h1>

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
