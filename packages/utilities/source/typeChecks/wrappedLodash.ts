import {
  isArray as _isArray,
  isBoolean as _isBoolean,
  isDate as _isDate,
  isEmpty as _isEmpty,
  isError as _isError,
  isFinite as _isFinite,
  isFunction as _isFunction,
  isInteger as _isInteger,
  isLength as _isLength,
  isNil as _isNil,
  isNull as _isNull,
  isNumber as _isNumber,
  isObject as _isObject,
  isPlainObject as _isPlainObject,
  isRegExp as _isRegExp,
  isSafeInteger as _isSafeInteger,
  isString as _isString,
  isTypedArray as _isTypedArray,
  isUndefined as _isUndefined,
} from "lodash-es"


// Types
export type Empty = EmptyArray | EmptyObj
export type EmptyArray = never[];
export interface EmptyObj {
  [index: string]: never;
  [index: number]: never;
}
export type Func = (...args: any[]) => any;
export interface Obj {
  [key: string]: any;
  [key: number]: any;
}
export type Nil = null | undefined;


// Type-guarded aliases of Lodash methods
export function isArray(item: any): item is any[] { return _isArray(item) }
export function isBoolean(item: any): item is boolean { return _isBoolean(item) }
export function isDate(item: any): item is Date { return _isDate(item) }
export function isEmpty(item: any): item is EmptyArray | EmptyObj { return _isEmpty(item) }
export function isError(item: any): item is Error { return _isError(item) }
export function isFinite(item: any): item is number { return _isFinite(item) }
export function isFunction(item: any): item is Func { return _isFunction(item) }
export function isInteger(item: any): item is number { return _isInteger(item) }
export function isLength(item: any): item is number { return _isLength(item) }
export function isNil(item: any): item is Nil { return _isNil(item) }
export function isNull(item: any): item is null { return _isNull(item) }
export function isNumber(item: any): item is number { return _isNumber(item) }
export function isObject(item: any): item is Obj { return _isObject(item) }
export function isPlainObject(item: any): item is Obj { return _isPlainObject(item) }
export function isRegExp(item: any): item is RegExp { return _isRegExp(item) }
export function isSafeInteger(item: any): item is number { return _isSafeInteger(item) }
export function isString(item: any): item is string { return _isString(item) }
export function isTypedArray(item: any): item is any[] { return _isTypedArray(item) }
export function isUndefined(item: any): item is undefined { return _isUndefined(item) }
