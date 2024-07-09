<script lang="ts">
	import type { FlexSchedule } from '@/lib/types/FlexSchedule';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import { dateStore } from '@/stores/date';
	import { onMount } from 'svelte';

	export let teacherId: string;

	let schedule: FlexSchedule | null;

	onMount(() => {
		fetchFlexSchedule();
	});

	function fetchFlexSchedule() {
		fetchEndpoint(ENDPOINTS.GET.Flex.GetSchedule, { date: $dateStore.format('YYYY-MM-DD') }).then(
			(data) => {
				schedule = data;
			}
		);
	}
</script>

<div class="wrapper">
	<h1 class="date">{$dateStore.format('MMMM DD, YYYY')}</h1>

	{#if schedule}
		<h1>Flex today</h1>
	{:else}
		<h1>No Flex!</h1>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
