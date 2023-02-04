import { EmptyArray, EmptyObj, Func, Nil, Obj } from '../types.ts'
import { parseRegExp } from './parse_regexp.ts'

export function isArray(item: unknown): item is unknown[] {
  return Array.isArray(item)
}

export function isBoolean(item: unknown): item is boolean {
  return typeof item === 'boolean'
}

export function isDate(item: unknown): item is Date {
  return item instanceof Date
}

export function isEmpty(item: unknown): item is EmptyArray | EmptyObj {
  if (isNil(item) || typeof item !== 'object') return false
  return Boolean(item && !Object.keys(item).length)
}

export function isError(item: unknown): item is Error {
  return item instanceof Error
}

export function isFunction(item: unknown): item is Func {
  return typeof item === 'function'
}

export function isNil(item: unknown): item is Nil {
  return item == null
}

export function isNull(item: unknown): item is null {
  return item === null
}

export function isNumber(item: unknown): item is number {
  return typeof item === 'number'
}

export function isObject(item: unknown): item is Obj<unknown> {
  if (isNull(item)) return false
  return isFunction(item) || typeof item === 'object'
}

export function isPromise(item: unknown): item is Promise<unknown> {
  return item instanceof Promise
}

export function isRegExp(item: unknown): item is RegExp {
  return item instanceof RegExp
}

export function isRegExpString(item: unknown): item is string {
  return isString(item) && Boolean(parseRegExp(item))
}

export function isSet(item: unknown): item is Set<unknown> {
  return item instanceof Set
}

export function isString(item: unknown): item is string {
  return typeof item === 'string'
}

export function isUndefined(item: unknown): item is undefined {
  return item === undefined
}
