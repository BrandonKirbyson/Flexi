<script lang="ts">
	import { page } from '$app/stores';
	import { type ComponentType } from 'svelte';

	export let title: string;
	export let icon: ComponentType;

	$: active = $page.url.pathname.split('/').pop() === title.toLowerCase();
	$: href = `/${$page.url.pathname.split('/')[1]}/${title.toLowerCase()}`;
</script>

<a class="tab" {href} class:active>
	<div class="icon">
		<svelte:component this={icon} />
	</div>
	<h1>{title}</h1>
</a>

<style lang="scss">
	a {
		all: unset;
	}
	.tab {
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 1rem 1rem;

		cursor: pointer;

		text-align: left;

		border-radius: 0.5rem;

		margin-bottom: 0.5rem;
		color: var(--text);
		font-weight: normal;

		.icon {
			width: 1rem;
			height: 1rem;
			margin-right: 1rem;
			margin-bottom: 0.2rem;
		}

		h1 {
			margin: 0;
			font-size: 1rem;
		}

		&.active {
			background-color: var(--primary);
			color: white;
		}
	}
</style>
