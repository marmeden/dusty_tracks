<script lang="ts">
    import type Song from "lib/types/songs";

/*   export let rows:any[] = []
  export let columns:any[] = [] */
  // columns.ts
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

// data.t

export let archive:Song[]

</script>

<table class="dt__table  w-full">
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
</table>

