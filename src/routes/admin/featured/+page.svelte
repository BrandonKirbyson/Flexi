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
</script>

<!-- type: FlexType;
	title: string;
	description?: string;
	room: string;
	seats: number;
	teacher: Name;
	imageUrl?: string; -->
<div>
	<form method="POST">
		{#each Object.keys(formFields) as key}
			<label>
				{key}
				<input bind:value={formFields[key]} type="text" />
			</label>
		{/each}
		<!-- <label>
			Title
			<input name="Title" type="text" />
		</label>
		<label>
			Description
			<input name="Description" type="text" />
		</label> -->
		<button>Log in</button>
	</form>
</div>

<style lang="scss">
</style>
