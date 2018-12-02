import { isArray, isNumber, isObject, isString } from ".."

export function classNames(...args: any[]) {
  return args
    .map(function flattenClassNames(arg: any) {
      if (isString(arg) || isNumber(arg)) {
        return arg
      }

      if (isArray(arg)) {
        const inner = classNames.apply(null, arg)
        if (inner) return inner
      }

      if (isObject(arg)) {
        const argArray = Object.keys(arg).filter(key => arg[key])
        const inner = classNames.apply(null, argArray)
        if (inner) return inner
      }
    })
    .filter(Boolean)
    .join(" ")
}
