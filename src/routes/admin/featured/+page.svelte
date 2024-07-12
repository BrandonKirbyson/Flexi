<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { FlexDept, type FlexFormProps } from '@/lib/types/Flex';
	import { ENDPOINTS, postEndpoint } from '@/lib/util/endpoints';

	import type { ActionResult } from '@sveltejs/kit';

	let data: Uint8Array | null = null;
	let files: FileList | null = null;
	$: {
		if (files && files[0]) {
			const binfile = files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target) data = new Uint8Array(e.target?.result as ArrayBuffer);
			};
			reader.readAsArrayBuffer(binfile);
		}
	}

	const formFields: FlexFormProps = {
		title: 'a',
		description: 'a',
		room: 'a',
		seats: 0,
		name: 'a',
		dept: FlexDept.Feature
		// image: ''
	};

	// let title = '';
	// let description = '';
	// let room = '';
	// let seats = 0;
	// let firstName = '';
	// let lastName = '';

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const formData = new FormData(event.currentTarget);
		if (data) formData.set('image', new Blob([data]));

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		if (data) {
			const imageURL = postEndpoint(ENDPOINTS.POST.UploadImage, {
				bytes: data
			});
			console.log('URL ', imageURL);
		}

		const result: ActionResult = deserialize(await response.text());

		console.log('RES', result);

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<div>
	<form method="POST" on:submit|preventDefault={handleSubmit}>
		<label>
			Title
			<input name="title" required type="text" bind:value={formFields.title} />
		</label>
		<label>
			Description
			<textarea name="description" bind:value={formFields.description}></textarea>
		</label>
		<label>
			Room
			<input name="room" required type="text" bind:value={formFields.room} />
		</label>
		<label>
			Seats
			<input name="seats" required type="number" bind:value={formFields.seats} />
		</label>

		<label>
			Name
			<input name="name" required type="text" bind:value={formFields.name} />
		</label>
		<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />

		<label for="fileinput">Your data</label>
		<input type="file" id="fileinput" bind:files />
		<div>
			<textarea id="datafield" rows="10" cols="50">{data}</textarea>
		</div>

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
