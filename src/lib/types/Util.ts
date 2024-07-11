export type ValueOf<T> = T[keyof T];

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

export type Implements<T, U extends T> = U;

type Primitive = string | number | boolean;
type FlattenPairs<T> = {
	[K in keyof T]: T[K] extends Primitive ? [K, T[K]] : FlattenPairs<T[K]>;
}[keyof T] &
	[PropertyKey, Primitive];
export type Flatten<T> = { [P in FlattenPairs<T> as P[0]]: P[1] };
