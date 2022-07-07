import { writable } from 'svelte/store';

export const cart = writable<{ id: string; amount: number }[]>([]);
