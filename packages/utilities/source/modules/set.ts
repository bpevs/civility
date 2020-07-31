import { Obj } from "../types"


export function set(
  object: Obj<any>,
  path: string[] = [],
  value: any,
): Obj<any> {
  const copyPath = [...path]
  const next = String(copyPath.shift())

  if (copyPath.length >= 1) {
    object[next] = {}
    set(object[next], copyPath, value)
  } else {
    object[next] = value
  }

  return object
}
