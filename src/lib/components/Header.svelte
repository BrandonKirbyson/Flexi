<script lang="ts">
	import { page } from '$app/stores';
	import { adminData, session, studentData, teacherData } from '@/stores/user';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import MdiUserCircle from '~icons/mdi/user-circle';
	import type { Name } from '../types/User';
	import { UserType } from '../types/UserType';
	import { ENDPOINTS, postEndpoint } from '../util/endpoints';
	import { formatName } from '../util/name';
	import ScheduleHeader from './schedule/ScheduleHeader.svelte';

	$: datePicker = hasDatePicker($page.url.pathname);

	let name: Name;

	// $: title = $page.url.pathname.split('/')[2] || 'Home';
	$: title = !datePicker
		? $page.url.pathname.split('/').pop() ?? 'Home'
		: $page.url.pathname.split('/').slice(-2, -1).pop() ?? 'Home';
	function hasDatePicker(path: string) {
		const regex = /\d{4}-\d{2}-\d{2}$/;
		return regex.test(path.split('/').pop() || '');
	}

	async function switchUserType() {
		const email = get(session).email;
		if (!email) return;

		const currentType = get(session).userType;
		if (currentType === UserType.Student) {
			await postEndpoint(ENDPOINTS.POST.SetUserType, {
				type: UserType.Admin,
				email: email
			});
		} else {
			await postEndpoint(ENDPOINTS.POST.SetUserType, {
				type: UserType.Student,
				email: email
			});
		}

		location.reload();
	}

	onMount(() => {
		session.subscribe((value) => {
			switch (value.userType) {
				case UserType.Student:
					studentData.subscribe((data) => {
						if (!data) return;
						name = data.name;
					});
					break;
				case UserType.Teacher:
					teacherData.subscribe((data) => {
						if (!data) return;
						name = data.name;
					});
					break;
				case UserType.Admin:
					adminData.subscribe((data) => {
						if (!data) return;
						name = data.name;
					});
					break;
			}
		});
	});
</script>

<div class="wrapper">
	<h1>{title.charAt(0).toUpperCase() + title.substring(1)}</h1>

	{#if datePicker}
		<ScheduleHeader />
	{/if}

	<div class="right-items">
		<div class="settings">
			<MdiUserCircle />
			{#if name}
				<span>{formatName(name)}</span>
			{/if}
			<button on:click={switchUserType}> {$session.userType} </button>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		height: var(--header-height);
		width: 100%;
	}

	.wrapper {
		padding-left: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		background-color: var(--bg);
		height: 5rem;
		border-bottom: 2px solid var(--border);

		h1 {
			color: var(--text);
			font-family: var(--font);
			text-align: left;
			padding: 1rem;
			max-height: 80px;
		}

		.right-items {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 1rem;
			height: 100%;

			.settings {
				color: var(--text);
				margin-right: 1rem;
				font-size: 2rem;
				display: flex;
				align-items: center;
				cursor: pointer;
				gap: 0.5rem;
			}

			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				margin-right: 0.5rem;
			}

			span {
				color: var(--text);
				font-family: var(--font);
				font-size: 1.2rem;
			}
		}
	}
</style>
