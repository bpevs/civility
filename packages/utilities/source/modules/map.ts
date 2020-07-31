import { Collection, Func } from "../types"
import { forEach } from "./forEach"
import { identity } from "./identity"


export function map(
  collection: Collection,
  func: Func = identity,
): any[] {
  const result: any = []

  forEach(collection, (item, index) => {
    result.push(func(item, index))
  })

  return result
}
