import type { Name } from './User';

export interface FlexDocument {
	classes: Record<string, Flex | Flex<FlexType.Featured>>;
}

export enum FlexType {
	Class = 'class',
	Featured = 'featured'
}

export type FlexClasses = Record<string, Flex | Flex<FlexType.Featured>>;

export interface FlexFilter {
	search?: string;
	dept?: FlexDept[];
	type?: FlexType;
	zero?: boolean;
}

export type MandateProps<T, K extends keyof T> = Omit<T, K> & {
	[MK in K]-?: NonNullable<T[MK]>;
};

export interface FlexBase {
	type: FlexType;
	title: string;
	room: string;
	dept: FlexDept;
	seats: number;
	teacher: Name;
}

export type Flex<T extends FlexType = FlexType.Class> = T extends FlexType.Featured
	? FlexBase & {
			description?: T extends FlexType.Featured ? string : never;
			date?: T extends FlexType.Featured ? string : never;
			imageUrl?: T extends FlexType.Featured ? string : never;
		}
	: FlexBase;

// export interface Flex<T extends FlexType = FlexType.Class> {
// 	type: FlexType;
// 	title: string;
// 	room: string;
// 	dept: FlexDept;
// 	seats: number;
// 	teacher: Name;
// 	students: Record<string, string[] | undefined>;

// 	// Featured flex only
// 	description?: T extends FlexType.Featured ? string : never;
// 	date?: T extends FlexType.Featured ? string : never;
// 	imageUrl?: T extends FlexType.Featured ? string : never;
// }

export interface FlexFormProps {
	date: string;
	title: string;
	description: string;
	name: string;
	room: string;
	seats: number;
	bytes?: Uint8Array;
}

export enum FlexDept {
	Math = 'Math',
	Library = 'Library',
	Science = 'Science',
	English = 'English',
	Arts = 'Arts',
	Counselors = 'Counselors',
	History = 'History',
	Language = 'Language',
	PE = 'PE',
	Other = 'Other',
	Feature = 'Featured'
}

export function deptNameToEnum(deptName: string): FlexDept {
	switch (deptName) {
		case 'English':
			return FlexDept.English;
		case 'Math':
			return FlexDept.Math;
		case 'World Language':
			return FlexDept.Language;
		case 'Social Studies':
			return FlexDept.History;
		case 'Advisors/College Counselors':
			return FlexDept.Counselors;
		case 'Arts and Music':
			return FlexDept.Arts;
		case 'Science':
			return FlexDept.Science;
		case 'PE and Health':
			return FlexDept.PE;
		case 'Library':
			return FlexDept.Library;
		case 'Featured Flex-Time':
			return FlexDept.Feature;
		default:
			return FlexDept.Other;
	}
}
