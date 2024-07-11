import { getScheduleCollection } from '@/lib/firebase/firebase';
import type { FlexSchedule } from '@/lib/types/FlexSchedule';
import { DAY_FORMAT } from '@/lib/util/date';
import type { Dayjs } from 'dayjs';
import { limit, onSnapshot, query, where } from 'firebase/firestore';
import { writable } from 'svelte/store';

function createScheduleStore() {
	const { subscribe, set, update } = writable(new Map<Dayjs, FlexSchedule | null>());

	return {
		subscribe,
		set,
		update,
		load: (day: Dayjs) => {
			const q = query(
				getScheduleCollection(),
				where('date', '==', day.format(DAY_FORMAT)),
				limit(1)
			);
			onSnapshot(q, (snapshot) => {
				let schedule = null;
				if (!snapshot.empty && snapshot.docs[0].exists()) {
					schedule = snapshot.docs[0].data() as FlexSchedule;
				}
				update((s) => {
					s.set(day, schedule);
					return s;
				});
			});
		}
	};
}

export const flexScheduleStore = createScheduleStore();
