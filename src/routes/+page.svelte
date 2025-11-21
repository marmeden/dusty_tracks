<script lang="ts">
    import { onMount } from 'svelte';
    import { initThree } from '$lib/three/init';
    import { createDemoScene } from '$lib/three/scene';

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const { scene, camera, renderer } = initThree(canvas);
        const { cube } = createDemoScene(scene);

        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();
    });
</script>

<style>
canvas {
    width: 100%;
    height: 100vh;
    display: block;
}
</style>

<canvas bind:this={canvas}></canvas>

