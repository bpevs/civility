import { Func, isFunction, reduce } from ".."


export function mapKeys(objectToMap: any, iteratee?: Func) {
  return reduce(objectToMap, (all, value, key) => {
    all[key] = isFunction(iteratee) ? iteratee(value) : value
    return all
  }, {})
}
