import type {CurrentStudent} from "$lib/types/Student";
import type {CurrentTeacher} from "$lib/types/Teacher";

export interface Name {
    first: string;
    last: string;
}

export interface FlexDate {
    year: number;
    month: number;
    day: number;
}

export type FlexDateString = `${number}-${number}-${number}`; // YYYY-MM-DD
export type StudentOrTeacher = CurrentStudent | CurrentTeacher;