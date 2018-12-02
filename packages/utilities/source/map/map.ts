import { Collection, forEach, Func, identity } from ".."


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
