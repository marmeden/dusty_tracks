import { writable, derived } from 'svelte/store';
import Song from 'lib/types/songs';

export const today = writable<Song[]>([]);
export const soon = writable<Song[]>([]);