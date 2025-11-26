<script lang="ts">
	import type Song from "lib/types/songs";
	import { writable, derived } from "svelte/store";
	import {
		Table,
		TableHeader,
		TableRow,
		TableHead,
		TableBody,
		TableCell
	} from "$lib/components/ui/table";

	export const columns = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "albumName",
			header: "Album",
		},
		{
			accessorKey: "gigVenue",
			header: "Venue",
		},
		{
			accessorKey: "gigCity",
			header: "City",
		},
		{
			accessorKey: "gigCountry",
			header: "Country",
		},
		{
			accessorKey: "lastPlayedOn",
			header: "Last Played On",
		},
	];

	const pageSize = 5; // filas por página
	let currentPage = writable(1);

	let sortColumn = writable<string | null>(null);
  	let sortAsc = writable(true);

	const sortedArchive = derived([sortColumn, sortAsc], ([$sortColumn, $sortAsc]) => {
		if (!$sortColumn) return archive;
		return [...archive].sort((a, b) => {
		if (a[$sortColumn] < b[$sortColumn]) return $sortAsc ? -1 : 1;
		if (a[$sortColumn] > b[$sortColumn]) return $sortAsc ? 1 : -1;
		return 0;
		});
	});

	const totalPages = derived([], () => Math.ceil($sortedArchive.length / pageSize));

	const paginatedArchive = derived([sortedArchive, currentPage], ([$sortedArchive, $currentPage]) => {
		const start = ($currentPage - 1) * pageSize;
		return $sortedArchive.slice(start, start + pageSize);
	});

	function goNext() {
		currentPage.update(n => Math.min(n + 1, totalPages));
	}

	function goPrev() {
		currentPage.update(n => Math.max(n - 1, 1));
	}

export let archive:Song[]

</script>

<!-- <table class="dt__table  w-full">
  <thead>
	<tr>
		<th class="border-0 px-5 py-3 text-left font-medium"></th>
		<th class="border-0 px-5 py-3 text-left font-medium"></th>
		<th colspan="3" class="px-5 py-3 text-center font-medium" style="border-bottom: 1px solid #737375">Last Played At</th> 
		<th class="border-0 px-5 py-3 text-left font-medium"></th>
    </tr>
    <tr>
      {#each columns as col}
        <th class="px-5 py-3 text-left font-medium">
          {col.header}
        </th>
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each archive as row}
      <tr>
        {#each columns as col}
          <td class="px-5 py-4">
            {row[col.accessorKey]}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table> -->

<div class="table-container max-h-72 overflow-y-auto border rounded-lg">
	<Table class="relative w-full border-collapse">
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead rowspan={2} class="align-bottom px-5 py-3 sticky top-0 z-10">{columns[0].header}</TableHead>
				<TableHead rowspan={2} class="align-bottom px-5 py-3 sticky top-0 z-10">{columns[1].header}</TableHead>
				<TableHead colspan={3} class="px-5 py-3 text-center sticky top-0 z-10">Gig</TableHead>
				<TableHead rowspan={2} class="align-bottom px-5 py-3 sticky top-0 z-10">{columns[5].header}</TableHead>
			</TableRow>
			<TableRow class="hover:bg-transparent">
				<TableHead class="px-5 py-3 sticky top-[3rem] z-10">{columns[2].header}</TableHead>
				<TableHead class="px-5 py-3 sticky top-[3rem] z-10">{columns[3].header}</TableHead>
				<TableHead class="px-5 py-3 sticky top-[3rem] z-10">{columns[4].header}</TableHead>
			</TableRow>
		</TableHeader>

		<TableBody class="no-hover">
			{#each archive as row}
				<TableRow>
					<TableCell class="px-5 py-4">{row.name}</TableCell>
					<TableCell class="px-5 py-4">{row.albumName}</TableCell>
					<TableCell class="px-5 py-4">{row.gigVenue}</TableCell>
					<TableCell class="px-5 py-4">{row.gigCity}</TableCell>
					<TableCell class="px-5 py-4">{row.gigCountry}</TableCell>
					<TableCell class="px-5 py-4">{row.lastPlayedOn}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
<div class="flex justify-between items-center mt-2">
  <button
    class="px-3 py-1 border rounded disabled:opacity-50"
    on:click={goPrev}
    disabled={$currentPage === 1}
  >
    Prev
  </button>
  <span>Page {$currentPage} of {$totalPages}</span>
  <button
    class="px-3 py-1 border rounded disabled:opacity-50"
    on:click={goNext}
    disabled={$currentPage === $totalPages}
  >
    Next
  </button>
</div>