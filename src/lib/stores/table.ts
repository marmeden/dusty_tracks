import { writable, derived } from 'svelte/store';

export const currentPage = writable(1);

export const totalPages = writable(1);

export const tableData = writable([]);