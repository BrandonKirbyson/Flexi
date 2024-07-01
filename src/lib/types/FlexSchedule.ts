import { Dayjs } from 'dayjs';

export interface FlexSchedule {
	date: Dayjs;
	classes: Record<string, ClassSchedule>;
}

export interface ClassSchedule {
	settings: ClassSettings;
	students: string[];
}

export enum FlexAvaliabilityType {
	LOCKED = 'locked',
	OPEN = 'open'
}

export interface ClassSettings {
	description?: string;
	type: FlexAvaliabilityType;
}
