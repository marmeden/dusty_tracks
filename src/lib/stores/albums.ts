import { writable, derived } from 'svelte/store';
import type Album from 'lib/types/album';

export const albums = writable<Album[]>([]);