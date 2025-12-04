<script lang="ts">
    import { tableData, currentPage, totalPages } from '$lib/stores/table';
    import { today, soon } from '$lib/stores/songs';
    import { albums } from '$lib/stores/albums';

    import Header from '$lib/components/Header.svelte';
    import Content from '$lib/components/Content.svelte';

    import { onMount } from 'svelte';
    import { initThree } from '$lib/three/init';
    import { createDemoScene } from '$lib/three/scene';
    import Song from '$lib/types/songs';
    import Album from '$lib/types/album';
    import Band from 'lib/types/band';

    let canvas: HTMLCanvasElement;

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
        today.set(data.attributes.today.data.map((t:any) => new Song(t)))
        soon.set(data.attributes.soon.data.map((s:any) => new Song(s)))

        const res2 = await fetch('/api/albums');
        const data2 = await res2.json()
        console.log(data2.data[0].attributes.albums.data)

        albums.set(data2.data[0].attributes.albums.data.map((a:any) => {
            const songs = a.attributes.songs.data.map((s:any) => new Song(s))
            return new Album({
                data: {
                    ...a,
                    songs: songs
                }
            })
        }))

        console.log($albums)


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
    <Content />
</div>

<style>
canvas {
    width: 100%;
    height: 100vh;
    display: block;
}
</style>

<!--<canvas bind:this={canvas}></canvas>-->

