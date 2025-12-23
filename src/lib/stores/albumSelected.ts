// src/lib/stores/selectedAlbum.ts
import { writable, derived } from 'svelte/store';
import type Album from 'lib/types/album';
import type { Marker } from 'cobe';

export const albumSelected = writable<Album | undefined>(undefined);

// Derivar los markers para COBE
export const locations = derived(albumSelected, ($album) => {
  if (!$album) return [];
  return $album.top5oldest.map(s => ({
    location: [s.lastPlayedAt!.lat!, s.lastPlayedAt!.long!] as [number, number],
    size: 0.1
  })) as Marker[];
});
