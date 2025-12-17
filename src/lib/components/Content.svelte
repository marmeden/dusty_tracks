<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Today from '$lib/components/Today.svelte';
	import Upcoming from '$lib/components/Upcoming.svelte';
	import Table from '$lib/components/Table.svelte';

	import Song from '$lib/types/songs';
    import GlobeCard from './GlobeCard.svelte';
    import AlbumSelector from './AlbumSelector.svelte';
    import type Album from 'lib/types/album';
	import { albums } from "lib/stores/albums";

	let albumSelected:Album | undefined

	function handleSelect(value:number) {
		console.log("Seleccionado:", value);
		albumSelected = $albums.find((album:Album) => album.id === value)
	}

</script>

<main class="dt__content">
	<section>
		<Card>
			<header>
				<h3>Echoes from This Day</h3>
				<p>Looking back at last performances that happened on this day</p>
			</header>
			<main>
				<Today></Today>
			</main>
		</Card>
		<Card>
			<header>
				<h3>On the Horizon</h3>
				<p>Upcoming anniversaries of songs’ last performances</p>
			</header>
			<main>
				<Upcoming></Upcoming>
			</main>
		</Card>
	</section>
	<section>
		<GlobeCard
			{albumSelected}>
			<header>
				<h3>Dusty Gems</h3>
				<p>Unearth the tracks that have gathered dust on the setlist.</p>
			</header>
			<div>
				<AlbumSelector
  					onSelect={handleSelect}>
				</AlbumSelector>
				{#each albumSelected?.top5Newest as top}
					<p>{top.name} {top.lastPlayedOn}</p>
				{/each}
			</div>
		</GlobeCard>
		<Card>
			<span></span>
			<header>
				<h3>Last Played Archive</h3>
				<p>Upcoming anniversaries of songs’ last performances</p>
			</header>
			<main>
				<Table></Table>
			</main>
		</Card>
	</section>
</main>


