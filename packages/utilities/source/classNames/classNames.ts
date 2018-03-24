import { isArray, isNumber, isObject, isString, keys } from "lodash-es";

export function classNames(...args: any[]) {
  return args
    .map(function flattenClassNames(arg: any) {
      if (isString(arg) || isNumber(arg)) {
        return arg;
      }

      if (isArray(arg)) {
        const inner = classNames.apply(null, arg);
        if (inner) return inner;
      }

      if (isObject(arg)) {
        const argArray = keys(arg).filter(key => arg[key]);
        const inner = classNames.apply(null, argArray);
        if (inner) return inner;
      }
    })
    .filter(Boolean)
    .join(" ");
}
