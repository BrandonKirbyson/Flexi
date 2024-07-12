<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { FlexDept, type FlexFormProps } from '@/lib/types/Flex';

	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from '../$types';

	let imgData: Uint8Array | null = null;
	let files: FileList | null = null;
	$: {
		if (files && files[0]) {
			const binfile = files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target) imgData = new Uint8Array(e.target?.result as ArrayBuffer);
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
	};

	export let form: ActionData;

	let error: any;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		if (imgData) data.set('image', new Blob([imgData]));
		const urlTarget = event.currentTarget.action;
		// if (imgData) {
		// 	const url = await postEndpoint(ENDPOINTS.POST.UploadImage, { bytes: imgData });
		// 	data.set('image', url ?? 'ERROR');
		// }

		const response = await fetch(urlTarget, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

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
		<input type="file" id="fileinput" bind:files accept="image/png, image/jpeg" />
		<div>
			<textarea id="datafield" rows="10" cols="50">{imgData}</textarea>
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
