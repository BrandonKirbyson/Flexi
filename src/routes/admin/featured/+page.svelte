<script lang="ts">
	import { FlexDept, type FlexFormProps } from '@/lib/types/Flex';

	const formFields: FlexFormProps = {
		title: '',
		description: '',
		room: '',
		seats: 0,
		name: '',
		dept: FlexDept.Feature,
		imageUrl: ''
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
			<input required type="text" bind:value={formFields.title} />
		</label>
		<label>
			Description
			<textarea bind:value={formFields.description}></textarea>
		</label>
		<label>
			Room
			<input required type="text" bind:value={formFields.room} />
		</label>
		<label>
			Seats
			<input required type="number" bind:value={formFields.seats} />
		</label>

		<label>
			Name
			<input required type="text" bind:value={formFields.name} />
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
