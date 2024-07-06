<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if Object.keys(data.classes).length === 0}
	<h1>Loading...</h1>
{:else}
	{#each Object.entries(data.classes) as [id, flex]}
		<h1>{id} - {JSON.stringify(flex)}</h1>
	{/each}
{/if}
