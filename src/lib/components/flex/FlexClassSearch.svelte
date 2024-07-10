<script lang="ts">
	import { FlexDept, type Flex, type FlexFilter } from '@/lib/types/Flex';

	export let classes: [string, Flex][];
	const originalClasses = [...classes];

	const filterOpts: FlexFilter = {
		search: '',
		dept: [],
		zero: false
	};

	function filterSearch() {
		if (!filterOpts.search && !filterOpts.dept?.length && filterOpts.zero) {
			console.log('this called');
			classes = originalClasses;
			return;
		}

		const { search, dept, zero } = filterOpts;
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

		const checkZero = (value: Flex) => {
			if (zero) return true;
			return value.seats !== 0;
		};

		originalClasses.forEach(([key, value]) => {
			if (
				// (dept?.some((d) => d === value.dept) && checkIncludes(value.teacher.last)) ||
				// checkIncludes(value.title) ||
				// checkIncludes(value.dept.toString())
				checkZero(value) &&
				checkDepts(value) &&
				checkString(value)
			) {
				filteredClasses.push([key, value]);
			}
		});

		classes = filteredClasses;
	}

	function toggleDept(dept: FlexDept) {
		if (filterOpts.dept?.includes(dept))
			filterOpts.dept = filterOpts.dept?.filter((d) => d !== dept);
		else filterOpts.dept = [...(filterOpts.dept || []), dept];
	}

	$: {
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
		<!-- {#if filterOpts.dept?.includes(dept)}
			<button
				on:click={() => (filterOpts.dept = filterOpts.dept?.filter((d) => d !== dept))}
				class="active"
			>
				{dept}
			</button>
		{:else}
			<button on:click={() => (filterOpts.dept = [...(filterOpts.dept || []), dept])}>
				{dept}
			</button>
		{/if} -->
	{/each}

	<button on:click={() => (filterOpts.zero = !filterOpts.zero)}>Zero</button>
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
