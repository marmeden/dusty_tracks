import { tableData, currentPage, totalPages } from '$lib/stores/table';
import { today, soon } from '$lib/stores/songs';
import { albums } from '$lib/stores/albums';

import Song from '$lib/types/songs';
import Album from '$lib/types/album';

export async function fetchPage(page: number) {
    const res = await fetch(`/api/archive?page=${page}`);
    const data = await res.json();

    tableData.set(data.data.map((t:any) => new Song(t)));
    currentPage.set(data.meta.pagination.page);
    totalPages.set(data.meta.pagination.pageCount);
}

export async function fetchToday() {
    const res = await fetch('/api/today');
    const data = await res.json();
    today.set(data.attributes.today.data.map((t:any) => new Song(t)))
    soon.set(data.attributes.soon.data.map((s:any) => new Song(s)))
}

export async function fetchAlbums() {
    const res2 = await fetch('/api/albums');
    const data2 = await res2.json()

    albums.set(data2.data[0].attributes.albums.data.map((a:any) => {
        const songs = a.attributes.songs.data.map((s:any) => new Song(s))
        return new Album({
            data: {
                ...a,
                songs: songs
            }
        })
    }))
}

export async function loadData() {
    await fetchToday()
    await fetchAlbums()
    await fetchPage(1)
}