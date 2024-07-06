<script lang="ts">
	import type { Flex } from '@/lib/types/Flex';
	import { onMount } from 'svelte';

	$: classes = new Map<string, Flex>();

	onMount(async () => {
		const response = await fetch('/api/flex');
		const res: Record<string, Flex> = await response.json();

		for (const [key, value] of Object.entries(res)) {
			classes.set(key, value);
		}

		classes = classes;
	});
</script>

<!-- <DateInput bind:value={$date} /> -->

{#if classes.size === 0}
	<h1>Loading...</h1>
{:else}
	{#each Array.from(classes.keys()) as flex}
		<h1>{flex}</h1>
	{/each}
{/if}

<h1>{classes.size}</h1>
