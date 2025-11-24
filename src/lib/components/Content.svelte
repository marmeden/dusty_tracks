<script>
	import Card from '$lib/components/Card.svelte';
	import Today from '$lib/components/Today.svelte';
</script>

<main class="dt__content">
	<section>
		<Card>
			<header>
				<h3>Echoes from This Day</h3>
				<p>Looking back at last performances that happened on this day</p>
			</header>
		</Card>
		<Card>
			<header>
				<h3>On the Horizon</h3>
				<p>Upcoming anniversaries of songs’ last performances</p>
			</header>
			<main></main>
		</Card>
	</section>
	<section>
		<Card>
			<header>
				<h3>Last Played Archive</h3>
				<p>Upcoming anniversaries of songs’ last performances</p>
			</header>
			<main></main>
		</Card>
	</section>
</main>

