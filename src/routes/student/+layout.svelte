<script>
	import FlexiSidebar from '@/lib/components/FlexiSidebar.svelte';
</script>

<div>
	<FlexiSidebar tabs={['dashboard', 'featured', 'flex']} />
	<slot></slot>
</div>
