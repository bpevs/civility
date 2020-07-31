import { Collection, Predicate } from "../types"
import { reduce } from "./reduce"


export function every(
  collection: Collection,
  func: Predicate,
): boolean {
  return reduce(collection, (prev, ...args) => {
    return prev && Boolean(func(...args))
  }, true)
}
