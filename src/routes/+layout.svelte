<script lang="ts">
	import './layout.css';
	import '/src/styles/app.scss';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Manrope:wght@200..800&family=Zen+Dots&display=swap" rel="stylesheet">
</svelte:head>

{@render children()}
