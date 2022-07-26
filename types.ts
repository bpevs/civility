// Types
export type Collection<T> = T[] | Obj<T>;
export type Func = (...args: unknown[]) => unknown;
export type Nil = null | undefined;
export type Predicate = (...args: unknown[]) => boolean;

export type Empty = EmptyArray | EmptyObj;
export type EmptyArray = never[];
export type EmptyCollection = EmptyArray | EmptyObj;
export type EmptyObj = Obj<never>;

// Interfaces
export interface Obj<t> {
  [key: string]: t;
  [key: number]: t;
}
