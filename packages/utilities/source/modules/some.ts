import { Collection, Predicate } from "../types"
import { every } from "./every"


export function some(
  collection: Collection,
  func: Predicate,
): boolean {
  return !every(collection, (item, index) => {
    return !func(item, index)
  })
}
