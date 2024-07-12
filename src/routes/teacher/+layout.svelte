<script lang="ts">
	import Layout from '@/lib/components/Layout.svelte';
	import Sidebar from '@/lib/components/sidebar/Sidebar.svelte';
	import Tab from '@/lib/components/sidebar/Tab.svelte';
	import { session } from '@/stores/user';
	import MdiGear from 'virtual:icons/mdi/gear';
	import MdiHome from 'virtual:icons/mdi/home';
	import MdiStar from 'virtual:icons/mdi/star';
</script>

{#if $session.loading}
	<h1>Loading...</h1>
{:else}
	<Layout>
		<Sidebar slot="sidebar">
			<Tab title="Dashboard" icon={MdiHome} />
			<Tab title="Flex" icon={MdiStar} />
			<Tab title="Settings" icon={MdiGear} />
		</Sidebar>

		<div slot="content">
			<slot></slot>
		</div>
	</Layout>

	<style lang="scss">
	</style>
{/if}
