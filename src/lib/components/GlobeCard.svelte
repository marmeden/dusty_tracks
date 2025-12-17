<script lang="ts">
	import { initThree } from '$lib/three/init';
	import { onMount } from 'svelte';
	import createGlobe from "cobe";
    import type Album from 'lib/types/album';
    import type Song from 'lib/types/songs';

	export let albumSelected:Album | undefined

	let locations = albumSelected && albumSelected?.top5oldest
		.filter(s => s.lastPlayedAt?.lat != null && s.lastPlayedAt?.long != null)
		.map((s:Song) => {
			const lat = s.lastPlayedAt.lat || 0
			const long = s.lastPlayedAt.long || 0
			return {
				location: [lat, long] as [number, number],
				size: 0.1
			}
	}) || [{location: [0, 0], size: 0}]

	let canvas:HTMLCanvasElement;
	let phi = 0;
	let theta = 0;

	let isDragging = false;
	let lastX = 0;
	let lastY = 0;

	let globe: any;

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
		const { width, height } = canvas.getBoundingClientRect();

		const globe = createGlobe(canvas, {
			devicePixelRatio: window.devicePixelRatio || 2,
			width: width * 2,
			height: height * 2,
			offset: [0, -10],
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.35,
			mapSamples: 16000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			markerColor: [0.745, 0.278, 0.612],
			glowColor: [0.882, 0.765, 0.984],
			markers: locations,
/* 			markers: [
				{ location: [37.7595, -122.4367], size: 0.03 },
				{ location: [40.7128, -74.006], size: 0.1 }
			], */
			onRender: state => {
				state.phi = phi;
				state.theta = theta;
				phi += 0.002;
			}
		});
	});
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

