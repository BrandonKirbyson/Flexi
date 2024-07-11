<script lang="ts">
	import { FlexDept, type Flex, type FlexFilter } from '@/lib/types/Flex';

	export let classes: Record<string, Flex>;
	export let filtered: string[];

	const filterOpts: FlexFilter = {
		search: '',
		dept: [],
		zero: false
	};

	function filterSearch() {
		if (!filterOpts.search && !filterOpts.dept?.length && filterOpts.zero) {
			filtered = Object.keys(classes);
			return;
		}

		const { search, dept, zero } = filterOpts;

		const filteredClasses: string[] = [];
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

		const checkZero = (value: Flex) => {
			if (zero) return true;
			return value.seats !== 0;
		};

		for (const [key, value] of Object.entries(classes)) {
			if (checkZero(value) && checkDepts(value) && checkString(value)) {
				filteredClasses.push(key);
			}
		}

		filtered = filteredClasses;
	}

	function toggleDept(dept: FlexDept) {
		if (filterOpts.dept?.includes(dept))
			filterOpts.dept = filterOpts.dept?.filter((d) => d !== dept);
		else filterOpts.dept = [...(filterOpts.dept || []), dept];
	}

	$: {
		classes;
		filterOpts.dept?.length;
		filterOpts.search;
		filterOpts.zero;
		filterSearch();
	}
</script>

<div class="wrapper">
	<input
		type="text"
		bind:value={filterOpts.search}
		class="search-class-input"
		placeholder="Search for flex"
	/>

	{#each Object.values(FlexDept) as dept}
		<button on:click={() => toggleDept(dept)} class:active={filterOpts.dept?.includes(dept)}>
			{dept}
		</button>
	{/each}

	<button on:click={() => (filterOpts.zero = !filterOpts.zero)} class:active={filterOpts.zero}>
		Zero
	</button>
</div>

<style lang="scss">
	.search-class-input {
		width: 100%;
		padding: 0.5rem 0;
		border: 1px solid var(--border);
	}

	.active {
		background: red;
	}
</style>
