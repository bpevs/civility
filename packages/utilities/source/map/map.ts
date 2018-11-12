import { Collection, forEach, Func } from "../index"


export function map(
  collection: Collection,
  func: Func,
): any[] {
  const result: any = []

  forEach(collection, (item, index) => {
    result.push(func(item, index))
  })

  return result
}
