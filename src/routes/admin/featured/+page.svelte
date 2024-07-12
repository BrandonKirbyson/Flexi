<script lang="ts">
	import type { FlexFormProps } from '@/lib/types/Flex';

	const formFields: FlexFormProps = {
		title: '',
		description: '',
		room: '',
		seats: 0,
		firstName: string
	};

	// let title = '';
	// let description = '';
	// let room = '';
	// let seats = 0;
	// let firstName = '';
	// let lastName = '';
</script>

<div>
	<form method="POST">
		<label>
			Title
			<input required type="text" bind:value={title} />
		</label>
		<label>
			Description
			<textarea bind:value={description}></textarea>
		</label>
		<label>
			Room
			<input required type="text" bind:value={room} />
		</label>
		<label>
			Seats
			<input required type="number" bind:value={seats} />
		</label>

		<label>
			Name
			<input required type="text" bind:value={firstName} />
			<input required type="text" bind:value={lastName} />
		</label>
		<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />

		<!-- {#each Object.keys(formFields) as key}
			<label>
				{key}
				<input name={key} />
			</label>
		{/each} -->
		<button>Log in</button>
	</form>
</div>

<style lang="scss">
</style>
