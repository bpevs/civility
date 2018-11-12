import { Collection, Predicate, reduce } from "../index"


export function every(
  collection: Collection,
  func: Predicate,
): boolean {
  return reduce(collection, (prev, ...args) => {
    return prev && Boolean(func(...args))
  }, true)
}
