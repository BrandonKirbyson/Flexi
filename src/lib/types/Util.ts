export type ValueOf<T> = T[keyof T];

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

export type Implements<T, U extends T> = U;
