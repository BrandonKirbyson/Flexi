<script lang="ts">
	import type { PageData, PageServerData } from './$types';

	export let data: PageServerData
</script>

<div>
	<h1>Admin Dashboard</h1>
	{data.userProfile}
</div>
