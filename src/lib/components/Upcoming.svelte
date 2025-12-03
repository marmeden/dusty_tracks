<script lang="ts">
	import UpcomingEphemeride from '$lib/components/UpcomingEphemeride.svelte'

	import { soon } from "lib/stores/songs";

	import Song from 'lib/types/songs';
</script>

<div class="upcoming flex gap-2">
	{#each $soon as upcoming_ephemeride}
		<UpcomingEphemeride {upcoming_ephemeride}></UpcomingEphemeride>
	{/each}
</div>

<style>
</style>