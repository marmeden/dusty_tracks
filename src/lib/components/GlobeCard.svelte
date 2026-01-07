<script lang="ts">
	import { initThree } from '$lib/three/init';
	import type { Marker } from 'cobe';
	import { onMount } from 'svelte';
	import createGlobe from "cobe";
    import type Album from 'lib/types/album';
    import type Song from 'lib/types/songs';

	import { albumSelected, locations } from 'lib/stores/albumSelected';


	$: currentLocations = $locations

	let canvas:HTMLCanvasElement;
	let phi = 0;
	let theta = 0.5;

	let isDragging = false;
	let lastX = 0;
	let lastY = 0;

	let globe: any;

	$: if (canvas && $locations.length) {
		createNewGlobe();
	}

	function createNewGlobe() {
		if (!canvas) return;
		const { width, height } = canvas.getBoundingClientRect();

    	if (globe && globe.destroy) globe.destroy();

		globe = createGlobe(canvas, {
			devicePixelRatio: window.devicePixelRatio || 2,
			width: width * 2,
			height: height * 2,
			offset: [0, -10],
			phi,
			theta,
			dark: 1,
			diffuse: 1.35,
			mapSamples: 16000,
			mapBrightness: 6,
			baseColor: [0.078, 0.0745, 0.086], // #141316
			markerColor: [0.745, 0.278, 0.612], // #BE479C
			glowColor: [0.882, 0.765, 0.984],   // #E1C3FB
			markers: $locations,
			onRender: state => {
				state.phi = phi;
				state.theta = theta;
				phi += 0.002;
			}
		});
  	}



	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		lastX = e.clientX;
		lastY = e.clientY;
		canvas.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging) return;

		const deltaX = e.clientX - lastX;
		const deltaY = e.clientY - lastY;

		// ajustar sensibilidad
		phi += deltaX * 0.005;
		theta += deltaY * 0.005;

		// limitar theta para que no se de la vuelta
		theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, theta));
		

		lastX = e.clientX;
		lastY = e.clientY;
	}

	function onPointerUp(e: PointerEvent) {
		isDragging = false;
		canvas.releasePointerCapture(e.pointerId);
	}


	onMount(() => {
		canvas.addEventListener("click", (e) => {
			handleClick(e);
		});
	});

	function handleClick(e: PointerEvent) {
    	if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const nx = (x / rect.width) * 2 - 1;
		const ny = (y / rect.height) * 2 - 1;

		const lon = nx * Math.PI;
		const lat = -ny * (Math.PI / 2);

		const currentMarkers = $locations;

		for (const marker of currentMarkers) {
			const radius = marker.size * 1.5; // Tolerancia según tamaño
			const dLat = lat - marker.location[0];
			const dLon = lon - marker.location[1];

			if (Math.abs(dLat) < radius && Math.abs(dLon) < radius) {
				console.log('Marker clicked:', marker);
				// marker.onClick?.(marker); // Callback opcional
			}
		}
  	}
</script>

<article class="dt__globe__card">
	<slot></slot>
	<canvas 
		bind:this={canvas}
		on:pointerdown={onPointerDown}
  		on:pointermove={onPointerMove}
  		on:pointerup={onPointerUp}>
	</canvas>
</article>

<style>
canvas {
	position: absolute;
	z-index: 1;
	inset: 0;
	width: 100%;
	height: 100%;
    display: block;
	overflow: visible;
	transform: translateY(-100px);
}
</style>

