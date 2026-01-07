<script lang="ts">
    import { loadData } from '$lib/service'
 
    import Header from '$lib/components/Header.svelte';
    import Content from '$lib/components/Content.svelte';

    import { onMount } from 'svelte';


    onMount(() => {
        loadData()
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

