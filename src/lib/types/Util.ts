export type ValueOf<T> = T[keyof T];

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

export type Implements<T, U extends T> = U;

export type Primitive = string | number | boolean;
export type NullOrUndefined = null | undefined;
export type PrimativeOrNull = Primitive | NullOrUndefined;
type FlattenPairs<T> = {
	[K in keyof T]: T[K] extends Primitive ? [K, T[K]] : FlattenPairs<T[K]>;
}[keyof T] &
	[PropertyKey, Primitive];
export type Flatten<T> = { [P in FlattenPairs<T> as P[0]]: P[1] };
