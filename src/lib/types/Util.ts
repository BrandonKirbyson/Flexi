export interface Name {
	first: string;
	last: string;
}

export interface FlexDate {
	year: number;
	month: number;
	day: number;
}

export type ValueOf<T> = T[keyof T];
