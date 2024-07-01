import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { writable } from 'svelte/store';

function createDate() {
	const { subscribe, set, update } = writable<Dayjs>();

	return {
		subscribe,
		selectDay: (day: Dayjs) => {
			update(() => day.startOf('day'));
		},
		incrementDay: () => {
			update((day) => day.add(1, 'day'));
		},
		decrementDay: () => {
			update((day) => day.subtract(1, 'day'));
		},
		reset: () => {
			set(dayjs().startOf('day'));
		}
	};
}

export const date = createDate();
