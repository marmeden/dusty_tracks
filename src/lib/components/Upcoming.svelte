<script lang="ts">
	import UpcomingEphemeride from '$lib/components/UpcomingEphemeride.svelte'

	import Song from 'lib/types/songs';
	export let today:Song[]
</script>

<div class="upcoming flex gap-2">
	{#each today as upcoming_ephemeride}
		<UpcomingEphemeride {upcoming_ephemeride}></UpcomingEphemeride>
	{/each}
</div>

<style>
</style>