<script lang="ts">
    import { tableData, currentPage, totalPages } from '$lib/stores/table';

    import Header from '$lib/components/Header.svelte';
    import Content from '$lib/components/Content.svelte';

    import { onMount } from 'svelte';
    import { initThree } from '$lib/three/init';
    import { createDemoScene } from '$lib/three/scene';
    import Song from '$lib/types/songs';

    let canvas: HTMLCanvasElement;

    let today:Song[] = []
    let archive:Song[] = []
    let numPages:number = 0

    async function fetchPage(page: number) {
        const res = await fetch(`/api/archive?page=${page}`);
        const data = await res.json();

        tableData.set(data.data.map((t:any) => new Song(t)));
        currentPage.set(data.page);
        totalPages.set(data.totalPages);
    }

    async function loadData() {
        const res = await fetch('/api/today');
        const data = await res.json();
        today = data.map((t:any) => new Song(t))

        await fetchPage(1);

/*         const res2 = await fetch('/api/archive')
        const data2 = await res2.json()
        archive = data2.data.map((t:any) => new Song(t))
        numPages = data2.meta.pagination.pageCount */
    }

    onMount(() => {
        loadData()
/*         const { scene, camera, renderer } = initThree(canvas);
        const { cube } = createDemoScene(scene);

        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate(); */
    });
</script>


<div class="dt__main">
    <Header title="Dusty Tracks" subtitle="Last Heard Live" />
    <Content {today} />
</div>

<style>
canvas {
    width: 100%;
    height: 100vh;
    display: block;
}
</style>

<!--<canvas bind:this={canvas}></canvas>-->

