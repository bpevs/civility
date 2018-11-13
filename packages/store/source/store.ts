import { Store } from "./Store/Store"


export interface IStores {
  [key: string]: Store
}


/**
 * Stores singleton deals with global state
 */
const _stores = {}

export const stores = new Proxy(_stores, {
  get: (target: IStores, name: string): Store | undefined => {
    return target[name]
  },

  set: (target: IStores, name: string, value: Store) => {
    target[name] = value
    return true
  },
})
