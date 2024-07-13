<script lang="ts">
	import { FlexType, type Flex } from '@/lib/types/Flex';
	import { ENDPOINTS, fetchEndpoint } from '@/lib/util/endpoints';
	import { onMount } from 'svelte';

	let classes: Record<string, Flex> = {};

	onMount(async () => {
		classes = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses, {
			type: FlexType.Featured
		});
	});
</script>

<div>
	{#each Object.values(classes) as flex}
		{flex.title}
	{/each}
</div>

<style lang="scss">
</style>
