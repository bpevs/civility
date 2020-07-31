import { Collection, Func, isArray } from ".."


export function forEach(
  collection: Collection,
  func: Func,
): void {
  if (isArray(collection)) {
    const length = collection.length
    for (let index = 0; index < length; index++) {
      func(collection[index], index)
    }
  } else {
    for (const index in collection) {
      if (collection.hasOwnProperty(index)) {
        func(collection[index], index)
      }
    }
  }
}
