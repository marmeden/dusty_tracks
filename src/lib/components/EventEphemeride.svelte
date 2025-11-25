<script lang="ts">
	import Song from 'lib/types/songs';
	export let today_ephemeride:Song

	const date = new Date(today_ephemeride.lastPlayedOn);

	const formattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	}).format(date);

	const today = new Date(); 

	let age = today.getFullYear() - date.getFullYear();

</script>

<div class="today__ephemeride">
    <div class="today__ephemeride__date flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar shrink-0"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      	<time datetime={today_ephemeride.lastPlayedOn}>{formattedDate}</time>
    </div>
    <p>A day like today {age} years ago  <span>{today_ephemeride.name}</span>  was played for the last time </p>
    <div class="today__ephemeride__place flex items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin shrink-0"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
      	<span>{today_ephemeride.lastPlayedAt.venue}, {today_ephemeride.lastPlayedAt.city}</span>
    </div>
</div>