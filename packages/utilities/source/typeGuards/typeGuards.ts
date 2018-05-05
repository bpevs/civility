// Types
export type Empty = EmptyArray | EmptyObj;
export type EmptyArray = never[];
export type Func = (...args: any[]) => any;
export type Nil = null | undefined;

// Interfaces
export interface EmptyObj {
  [index: string]: never;
  [index: number]: never;
}
export interface Obj {
  [key: string]: any;
  [key: number]: any;
}


// Type-guards
export function isArray(item: any): item is any[] {
  return Array.isArray(item)
}

export function isBoolean(item: any): item is boolean {
  return typeof item === "boolean"
}

export function isDate(item: any): item is Date {
  return item instanceof Date
}

export function isEmpty(item: any): item is EmptyArray | EmptyObj {
  return isNil(item) || !Object.keys(item).length
}

export function isError(item: any): item is Error {
  return item instanceof Error
}

export function isFunction(item: any): item is Func {
  return typeof item === "function"
}

export function isNil(item: any): item is Nil {
  return item == null
}

export function isNull(item: any): item is null {
  return item === null
}

export function isNumber(item: any): item is number {
  return typeof item === "number"
}

export function isObject(item: any): item is Obj {
  if (isNull(item)) return false
  return isFunction(item) || typeof item === "object"
}

export function isRegExp(item: any): item is RegExp {
  return item instanceof RegExp
}

export function isString(item: any): item is string {
  return typeof item === "string"
}

export function isUndefined(item: any): item is undefined {
  return item === undefined
}
