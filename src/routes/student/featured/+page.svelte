<script lang="ts">
	import FlexClassItem from '@/lib/components/flex/FlexClassItem.svelte';
	import { FlexType, type Flex } from '@/lib/types/Flex';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	let classes: Record<string, Flex<FlexType.Featured>> = {};

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetFeaturedFlexes);
	});
</script>

<div>
	{#each Object.entries(classes) as [id, flex]}
		<FlexClassItem {flex} {id} date={dayjs(flex.date)} featured={true} />
	{/each}
</div>

<style lang="scss">
</style>
