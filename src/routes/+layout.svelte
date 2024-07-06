<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<slot></slot>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

	:global(body) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		max-height: 100vh;
		height: 100vh;
	}

	:root {
		--bg: #fff;
		--bg-secondary: #fafbfc;
		--bg-highlight: red;
		--text-highlight: #000;

		--text: #21262c;
		--text-secondary: #3c3c3c;
		--text-muted: #868686;
		--primary: #2aa744;
		--secondary: #dcf0d7ec;

		--border: #f2f1f1;

		--logo-font: 'Pacifico', cursive;
		--font: 'Inter', sans-serif;

		background-color: var(--bg);
		color: var(--text);
		font-family: var(--font);
	}
</style>
