<script lang="ts">
	import FlexiLayout from '@/lib/components/FlexiLayout.svelte';
	import FlexiSidebar from '@/lib/components/sidebar/FlexiSidebar.svelte';
	import Tab from '@/lib/components/sidebar/Tab.svelte';
	import MdiClock from 'virtual:icons/mdi/clock';
	import MdiGear from 'virtual:icons/mdi/gear';
	import MdiHome from 'virtual:icons/mdi/home';
	import MdiStar from 'virtual:icons/mdi/star';
</script>

<FlexiLayout>
	<FlexiSidebar slot="sidebar">
		<Tab title="Dashboard" icon={MdiHome} />
		<Tab title="Featured" icon={MdiStar} />
		<Tab title="Flex" icon={MdiClock} />
		<Tab title="Settings" icon={MdiGear} />
	</FlexiSidebar>

	<div slot="content">
		<slot></slot>
	</div>
</FlexiLayout>
