<script lang="ts">
	import { page } from '$app/stores';
	import { type ComponentType } from 'svelte';

	export let title: string;
	export let icon: ComponentType;

	$: active = $page.url.pathname.split('/').pop() === title.toLowerCase();
</script>

<a class="tab" href={title.toLowerCase()} class:active>
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
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 1rem 0;

		color: var(--text);

		.icon {
			width: 32px;
			height: 32px;
			margin-right: 0.5rem;
		}

		h1 {
			margin: 0;
			font-size: 1.5rem;
		}

		&.active {
			background-color: var(--primary);
		}
	}
</style>
