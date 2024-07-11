<script lang="ts">
	interface props {
		title: string;
		description: string;
		room: string;
		seats: number;
		firstName: string;
		lastName: string;

		[key: string]: any;
	}

	const formFields: props = {
		title: '',
		description: '',
		room: '',
		seats: 0,
		firstName: '',
		lastName: ''
	};

	$: {
		formFields;
	}
</script>

<div>
	<form method="POST">
		{#each Object.keys(formFields) as key}
			<label>
				{key}
				<input bind:value={formFields[key]} type="text" />
			</label>
		{/each}
		<button>Log in</button>
	</form>
</div>

<style lang="scss">
</style>
