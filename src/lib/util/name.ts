import type { Name } from '../types/User';

export function format(name: string): string {
	return name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
}

export function formatStringToName(name: string): Name {
	const [first, last] = name.split(' ');
	return {
		first: format(first),
		last: format(last)
	};
}

export function formatName(name: Name): string {
	return `${format(name.first)} ${format(name.last)}`;
}

export function formatNameToName(name: Name): Name {
	return {
		first: format(name.first),
		last: format(name.last)
	};
}
