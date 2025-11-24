<script lang="ts">
    import emblaCarouselSvelte from 'embla-carousel-svelte'
    import EventEphemeride from '$lib/components/EventEphemeride.svelte'

    import Song from 'lib/types/songs';

    export let today:Song[]
</script>

<div class="embla" use:emblaCarouselSvelte>
  <div class="embla__container">
    {#each today as today_ephemeride }
        <div class="embla__slide">
            <EventEphemeride {today_ephemeride}></EventEphemeride>
        </div>
    {/each}
  </div>
</div>

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>