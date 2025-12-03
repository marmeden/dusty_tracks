<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Today from '$lib/components/Today.svelte';
	import Upcoming from '$lib/components/Upcoming.svelte';
	import Table from '$lib/components/Table.svelte';

	import Song from '$lib/types/songs';
    import GlobeCard from './GlobeCard.svelte';
    import AlbumSelector from './AlbumSelector.svelte';

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
		<GlobeCard>
			<header>
				<h3>Dusty Gems</h3>
				<p>Unearth the tracks that have gathered dust on the setlist.</p>
			</header>
			<AlbumSelector></AlbumSelector>
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

