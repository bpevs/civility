import { Collection, every, Predicate } from ".."


export function some(
  collection: Collection,
  func: Predicate,
): boolean {
  return !every(collection, (item, index) => {
    return !func(item, index)
  })
}
