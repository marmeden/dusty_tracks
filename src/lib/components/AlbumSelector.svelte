<script lang="ts">
    // @ts-ignore
    import { Combobox } from "bits-ui";

    import { albums } from "lib/stores/albums";
    import type Album from "lib/types/album";

    let searchValue = $state("");
    let selectedAlbum = $state<Album | null>(null);

    const filteredAlbums = $derived(
    searchValue === ""
        ? $albums
        : (selectedAlbum)? $albums : $albums.filter((album:Album) =>
            album.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    $effect(() => {
        if ($albums.length > 0 && selectedAlbum === null) {
            console.log('entra')
            selectedAlbum = $albums[0];
            searchValue = $albums[0]?.name;
            console.log(searchValue)
            props.onSelect?.(selectedAlbum.id)
        } 
    })

    function selectThisAlbum(id:number) {
        selectedAlbum = $albums.find((a:Album) => a.id === id) || null
        // searchValue = selectedAlbum?.name || ''
        searchValue = 'caca'
        props.onSelect?.(id)
    }

    const props = $props<{
        onSelect?: (albumId: number) => void;
    }>();
</script>
 
<div class="album__selector flex flex-col gap-2">
    <p>Era</p>
    <Combobox.Root
        type="single"
        inputValue={selectedAlbum?.name}
        name="album"
        onOpenChangeComplete={(o:any) => {
            if (!o) searchValue = "";
        }}
        onValueChange={(event:any) => {
            console.log('sadfas')
            console.log(event)
            selectThisAlbum(event)
        }}
    >
        <div class="relative">
            <Combobox.Input
            oninput={(e:any) => {searchValue = e.currentTarget.value}}
            class={searchValue}
            placeholder="Search an album"
            aria-label="Search an album"
            />
            <Combobox.Trigger
            class="absolute end-3 top-1/2 size-6 -translate-y-1/2 touch-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/>
                </svg>
            </Combobox.Trigger>
        </div>
        <Combobox.Portal>
            <Combobox.Content
            class="album__list focus-override border-muted bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-96 max-h-[var(--bits-combobox-content-available-height)] w-[var(--bits-combobox-anchor-width)] min-w-[var(--bits-combobox-anchor-width)] select-none rounded-xl border px-1 py-3 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
            sideOffset={10}
            >
            <Combobox.ScrollUpButton
                class="flex w-full items-center justify-center py-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
            </Combobox.ScrollUpButton>
            <Combobox.Viewport class="p-1">
                <Combobox.Item
                    class="album__list__item rounded-button data-highlighted:bg-muted outline-hidden flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
                    value=-1
                    label='All'
                >
                    {#snippet children({ selected })}
                    All
                    {#if selected}
                        <div class="ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>
                    {/if}
                    {/snippet}
                </Combobox.Item>
                {#each filteredAlbums as album, i (i + album.id)}
                    <Combobox.Item
                        class="album__list__item rounded-button data-highlighted:bg-muted outline-hidden flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
                        value={album.id}
                        label={album.name}
                    >
                        {#snippet children({ selected })}
                        {album.name}
                        {#if selected }
                            <div class="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                        {/if}
                        {/snippet}
                    </Combobox.Item>
                {:else}
                <span class="block px-5 py-2 text-sm text-muted-foreground">
                    No results found, try again.
                </span>
                {/each}
            </Combobox.Viewport>
            <Combobox.ScrollDownButton
                class="flex w-full items-center justify-center py-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </Combobox.ScrollDownButton>
            </Combobox.Content>
        </Combobox.Portal>
    </Combobox.Root>
</div>