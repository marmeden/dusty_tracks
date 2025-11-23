<script lang="ts">
    import { onMount } from 'svelte';
    import { initThree } from '$lib/three/init';
    import { createDemoScene } from '$lib/three/scene';
    import Song from '$lib/types/songs';

    let canvas: HTMLCanvasElement;

    async function loadData() {
        const res = await fetch('/api/today');
        const data = await res.json();
        console.log(data)
        const today = data.map((t:any) => new Song(t))
        console.log(today)
    }

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

        loadData()
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

