import type { Name } from './User';

export interface FlexDocument {
	classes: Record<string, Flex>;
}

export enum FlexType {
	Class = 'class',
	Featured = 'featured'
}

export interface FlexFilter {
	search?: string;
	dept?: FlexDept[];
	type?: FlexType;
	zero?: boolean;
}

export interface Flex {
	type: FlexType;
	title: string;
	description?: string;
	room: string;
	dept: FlexDept;
	seats: number;
	teacher: Name;
	students: Record<string, string[] | undefined>;
	imageUrl?: string;
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
	Feature = 'Feature'
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
