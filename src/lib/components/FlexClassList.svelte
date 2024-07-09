<script lang="ts">
	import { session } from '@/stores/user';
	import { onMount } from 'svelte';
	import type { Flex } from '../types/Flex';
	import { ENDPOINTS, fetchEndpoint } from '../util/endpoints';

	let classes: Record<string, Flex> | undefined = undefined;
	let error: string | undefined = undefined;
	async function getClasses() {
		if (classes) return;

		try {
			const res = await fetchEndpoint(ENDPOINTS.GET.Flex.GetClasses);
			classes = res;
		} catch (e) {
			error = e as string;
		}
	}

	onMount(() => {
		session.subscribe((s) => {
			if (!s.loading) getClasses();
		});
	});
</script>

<div class="wrapper">
	{#if !classes}
		<h1>Loading...</h1>
	{:else if error}
		{error}
	{:else}
		{#each Object.entries(classes) as [id, flex]}
			<div class="flex-item">
				<div class="title">
					<span class="title-name">{flex.title}</span>
					<span class="title-dept">{flex.dept}</span>
				</div>
				<p>{JSON.stringify(flex)}</p>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
	}

	.flex-item {
		margin: 1rem;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		// &-name {
		// 	font-size: 1.5rem;
		// }

		&-dept {
			font-size: 1rem;
			background-color: #ddd;
			border: none;
			color: black;
			padding: 10px 20px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			margin: 4px 2px;
			cursor: pointer;
			border-radius: 16px;
		}
	}
</style>
