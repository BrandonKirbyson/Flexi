<script lang="ts">
	import { session } from '../../../stores/user';

	const s = session;
</script>

<!-- <DateInput bind:value={$date} /> -->

<div>{JSON.stringify($s)}</div>
