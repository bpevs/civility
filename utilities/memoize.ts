export function memoize<T>(func: T): T {
  if (typeof func !== 'function') throw new Error(`${func} is not a function`)

  // deno-lint-ignore no-explicit-any
  const memo: Map<any, any> = new Map()

  // deno-lint-ignore no-explicit-any
  const memoizedFunc: any = (...args: any[]) => {
    if (!memo.has(args[0])) {
      memo.set(args[0], func.apply(null, args))
    }

    return memo.get(args[0])
  }

  return memoizedFunc
}
