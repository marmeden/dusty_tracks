<script lang="ts">
	import Song from 'lib/types/songs';
	export let upcoming_ephemeride:Song

	const date = new Date(upcoming_ephemeride.lastPlayedOn);

	const formattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
	}).format(date);

	const today = new Date(); 

	let age = Math.round(today.getFullYear() - date.getFullYear());

</script>

<div class="upcoming__ephemeride flex flex-col gap-2">
	<div class="upcoming__ephemeride__date flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar shrink-0"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      	<time datetime={upcoming_ephemeride.lastPlayedOn}>{formattedDate}</time>
    </div>
	<div class="flex flex-col items-center">
		<p>{age}</p>
		<span>years ago</span>
	</div>
</div>