import { Func } from "../types"


export function memoize(func: Func): Func {
  const memo: Map<any, any> = new Map()

  return (...args: any[]) => {
    if (!memo.has(args[0])) {
      memo.set(args[0], func.apply(null, args))
    }

    return memo.get(args[0])
  }
}
