import { Dayjs } from 'dayjs';

/**
 * FlexSchedule is the schedule of a single day for all the students signed up and settings for each class on that particular day.
 */
export interface FlexSchedule {
	date: Dayjs;
	classes: Record<string, ClassSchedule>;
}

export interface FlexScheduleDocument extends Omit<FlexSchedule, 'date'> {
	date: string;
}

export interface ClassSchedule {
	settings: ClassSettings;
	students: string[];
	teacher: string;
}

export enum FlexAvaliabilityType {
	LOCKED = 'locked',
	OPEN = 'open'
}

export interface ClassSettings {
	description?: string;
	type: FlexAvaliabilityType;
}
