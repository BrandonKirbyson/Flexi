<script lang="ts">
	import Layout from '@/lib/components/Layout.svelte';
	import Sidebar from '@/lib/components/sidebar/Sidebar.svelte';
	import Tab from '@/lib/components/sidebar/Tab.svelte';
	import MdiGear from 'virtual:icons/mdi/gear';
	import MdiHome from 'virtual:icons/mdi/home';
	import MdiStar from 'virtual:icons/mdi/star';
</script>

<Layout>
	<Sidebar slot="sidebar">
		<Tab title="Dashboard" icon={MdiHome} />
		<Tab title="Schedule" icon={MdiStar} />
		<Tab title="Settings" icon={MdiGear} />
	</Sidebar>

	<div slot="content">
		<slot></slot>
	</div>
</Layout>
