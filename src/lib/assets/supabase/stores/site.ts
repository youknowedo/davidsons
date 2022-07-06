import { writable } from 'svelte/store';
import type { Site } from '../client';

export const site = writable<Site | null>();
