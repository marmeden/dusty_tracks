<script lang="ts">
	import type Song from "lib/types/songs";
	import { tableData, currentPage, totalPages } from "lib/stores/table";
	import { fetchPage } from "lib/service";
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

	async function goPrev() {
		await fetchPage($currentPage - 1)
	}

	async function goNext() {
		await fetchPage($currentPage + 1)
	}

</script>

<div class="table-container max-h-72 overflow-y-auto border rounded-lg">
	<Table class="relative w-full border-collapse">
		<TableHeader class="pointer-events-none">
			<TableRow>
				<TableHead rowspan={2} class="align-bottom px-5 py-3 sticky top-0 z-10">{columns[0].header}</TableHead>
				<TableHead rowspan={2} class="align-bottom px-5 py-3 sticky top-0 z-10">{columns[1].header}</TableHead>
				<TableHead colspan={3} class="px-5 py-3 text-center sticky top-0 z-10">Gig</TableHead>
				<TableHead rowspan={2} class="align-bottom px-5 py-3 sticky top-0 z-10">{columns[5].header}</TableHead>
			</TableRow>
			<TableRow>
				<TableHead class="px-5 py-3 sticky top-[3rem] z-10">{columns[2].header}</TableHead>
				<TableHead class="px-5 py-3 sticky top-[3rem] z-10">{columns[3].header}</TableHead>
				<TableHead class="px-5 py-3 sticky top-[3rem] z-10">{columns[4].header}</TableHead>
			</TableRow>
		</TableHeader>

		<TableBody class="no-hover">
			{#each ($tableData as Song[]) as row}
				<TableRow class="pointer-events-none">
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
<div class="table-pagination flex justify-between items-center mt-2">
	<button
		class="px-3 py-1 border rounded cursor-pointer"
		on:click={goPrev}
		disabled={$currentPage === 1}
	>
		Prev
	</button>
	<span>Page {$currentPage} of {$totalPages}</span>
	<button
		class="px-3 py-1 border rounded cursor-pointer"
		on:click={goNext}
		disabled={$currentPage === $totalPages}
	>
		Next
	</button>
</div>