<script lang="ts">
	import { page } from '$app/stores';
	import Layout from '@/lib/components/Layout.svelte';
	import Sidebar from '@/lib/components/sidebar/Sidebar.svelte';
	import Tab from '@/lib/components/sidebar/Tab.svelte';
	import { session } from '@/stores/user';
	import MdiClock from 'virtual:icons/mdi/clock';
	import MdiGear from 'virtual:icons/mdi/gear';
	import MdiHome from 'virtual:icons/mdi/home';
	import MdiStar from 'virtual:icons/mdi/star';

	$: route = $page.url.pathname;
</script>

{#if $session.loading}
	Loading...
{:else}
	<Layout>
		<Sidebar slot="sidebar">
			<Tab title="Dashboard" icon={MdiHome} />
			<Tab title="Featured" icon={MdiStar} />
			<Tab title="Flex" icon={MdiClock} />
			<Tab title="Settings" icon={MdiGear} />
		</Sidebar>

		<div slot="content">
			<slot></slot>
		</div>
	</Layout>
{/if}

<style lang="scss">
</style>
