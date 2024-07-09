<script lang="ts">
	import { dateStore } from '@/stores/date';
</script>

<div class="wrapper">
	{$dateStore.format()}
</div>

<style lang="scss">
	.wrapper {
	}
</style>
