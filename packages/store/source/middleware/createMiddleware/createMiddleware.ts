import { Func, isObject } from "@civility/utilities"
import { Middleware, Store } from "redux"


export type middlewareFunc = (store: Store, next: Func, action: any, ...args: any[]) => Func


export function createMiddleware(middleware: middlewareFunc, ...args: any[]): Middleware {
  return (store: Store) => {
    if (!isObject(store)) {
      throw Error(store + " is not a valid value for store")
    }

    return (next: Func) => (action: any) => {
      return middleware.apply(null, [ store, next, action, ...args ])
    }
  }
}
