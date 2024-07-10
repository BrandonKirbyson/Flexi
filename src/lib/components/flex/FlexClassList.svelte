<script lang="ts">
	import { ENDPOINTS, fetchEndpoint } from '../../util/endpoints';

	// let classTuple: [string, Flex][] = [];

	async function getClasses() {
		return Object.entries(await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses));
	}
	// onMount(async () => {});
</script>

<div class="wrapper">
	<!-- {#if classTuple.length === 0}
		<h1>Loading...</h1> -->
	<!-- {:else} -->
	<!-- {#await getClasses()}
		LOADING
	{:then classTuple}
		<FlexClassSearch bind:classes={classTuple} />
		{#each classTuple as [_, flex]}
			<FlexClassItem {flex} />
		{/each}
	{/await} -->
	<!-- {/if} -->
</div>

<style lang="scss">
	.wrapper {
		overflow: scroll;
		height: 100%;
	}
</style>
