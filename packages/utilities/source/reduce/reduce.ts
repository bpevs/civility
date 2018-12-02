import { Collection, forEach, Func } from ".."


export function reduce(
  collection: Collection,
  func: Func,
  initialValue?: any,
): any {
  let result: any = initialValue
  let ignoreInitialValue = Array.prototype.slice.call(arguments).length !== 3

  forEach(collection, (item, index) => {
    result = ignoreInitialValue ? item : func(result, item, index)
    ignoreInitialValue = false
  })

  return result
}
