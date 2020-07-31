import { Func } from "../types"
import { reduce } from "./reduce"
import { isFunction } from "./typeGuards"


export function mapKeys(objectToMap: any, iteratee?: Func) {
  return reduce(objectToMap, (all, value, key) => {
    all[key] = isFunction(iteratee) ? iteratee(value) : value
    return all
  }, {})
}
