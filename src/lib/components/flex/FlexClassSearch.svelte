<script lang="ts">
	import type { Flex, FlexFilter } from '@/lib/types/Flex';

	export let classes: [string, Flex][];
	const originalClasses = [...classes];

	const filterOpts: FlexFilter = {
		search: '',
		dept: []
	};

	function filterSearch() {
		if (!filterOpts.search) return (classes = originalClasses);

		const { search, dept } = filterOpts;
		console.log(search, originalClasses, classes);

		const filteredClasses: [string, Flex][] = [];
		const checkIncludes = (value: string) =>
			value.toLowerCase().includes(search.toLowerCase().trim()) ||
			search.toLowerCase().includes(value.toLowerCase().trim());

		originalClasses.forEach(([key, value]) => {
			if (
				checkIncludes(value.teacher.first) ||
				checkIncludes(value.teacher.last) ||
				checkIncludes(value.title) ||
				checkIncludes(value.dept.toString())
			) {
				filteredClasses.push([key, value]);
			}
		});

		classes = filteredClasses;
	}

	$: filterOpts.search && filterSearch();
</script>

<div class="wrapper">
	<input
		type="text"
		bind:value={filterOpts.search}
		class="search-class-input"
		placeholder="Search for flex"
	/>
</div>

<style lang="scss">
	.search-class-input {
		width: 100%;
		padding: 0.5rem 0;
		border: 1px solid var(--border);
	}
</style>
