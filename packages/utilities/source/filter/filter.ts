import { Collection, forEach, Predicate } from "../index"

export function filter(
  collection: Collection,
  func: Predicate,
): any[] {
  const result: any = []

  forEach(collection, (item, index) => {
    if (func(item, index)) result.push(item)
  })

  return result
}
