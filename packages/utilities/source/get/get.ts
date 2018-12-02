import { Obj } from ".."


export function get(
  object: Obj<any>,
  path: string[] = [],
  defaultValue?: any,
): any {
  try {
    let next: Obj<any> = object
    for (const key of path) {
      next = next[key]
    }
    return next
  } catch (error) {
    return defaultValue
  }
}
