<script lang="ts">
	import { FlexDept, type Flex, type FlexFilter } from '@/lib/types/Flex';

	export let classes: [string, Flex][];
	const originalClasses = [...classes];

	const filterOpts: FlexFilter = {
		search: '',
		dept: []
	};

	function filterSearch() {
		console.log(filterOpts);
		if (!filterOpts.search && !filterOpts.dept?.length) {
			classes = originalClasses;
			return;
		}

		const { search, dept } = filterOpts;
		console.log(search, originalClasses, classes);

		const filteredClasses: [string, Flex][] = [];
		const checkIncludes = (value: string) =>
			search &&
			(value.toLowerCase().includes(search.toLowerCase().trim()) ||
				search.toLowerCase().includes(value.toLowerCase().trim()));

		const checkDepts = (value: Flex) => {
			if (!dept?.length) return true;
			return dept.some((d) => d === value.dept);
		};

		const checkString = (value: Flex) => {
			if (!search) return true;
			return (
				checkIncludes(value.title) ||
				checkIncludes(value.dept.toString()) ||
				checkIncludes(value.teacher.last)
			);
		};

		originalClasses.forEach(([key, value]) => {
			if (
				// (dept?.some((d) => d === value.dept) && checkIncludes(value.teacher.last)) ||
				// checkIncludes(value.title) ||
				// checkIncludes(value.dept.toString())
				checkDepts(value) &&
				checkString(value)
			) {
				filteredClasses.push([key, value]);
			}
		});

		classes = filteredClasses;
	}

	$: (filterOpts.dept?.length || filterOpts.search) && filterSearch();
</script>

<div class="wrapper">
	<input
		type="text"
		bind:value={filterOpts.search}
		class="search-class-input"
		placeholder="Search for flex"
	/>

	<button on:click={() => (filterOpts.dept = [...(filterOpts.dept || []), FlexDept.Math])}
		>Math</button
	>
</div>

<style lang="scss">
	.search-class-input {
		width: 100%;
		padding: 0.5rem 0;
		border: 1px solid var(--border);
	}
</style>
