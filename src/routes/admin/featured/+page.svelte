<script lang="ts">
	import type { FlexFormProps } from '@/lib/types/Flex';

	const formFields: FlexFormProps = {
		title: '',
		description: '',
		room: '',
		seats: 0,
		firstName: '',
		lastName: ''
	};

	$: {
		formFields;
		console.log(formFields);
	}
</script>

<div>
	<form method="POST">
		{#each Object.keys(formFields) as key}
			<label>
				{key}
				<input name={key} />
			</label>
		{/each}
		<button>Log in</button>
	</form>
</div>

<style lang="scss">
</style>
