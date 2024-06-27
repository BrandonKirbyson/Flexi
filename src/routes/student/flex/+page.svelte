<script lang="ts">
	import { session } from '../../../stores/user';

	const s = session;
</script>

<div>{JSON.stringify($s)}</div>
