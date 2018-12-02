import { Func } from ".."


export function attempt(
  func: Func,
  ...args: any[]
): any {
  try {
    return func.apply(null, args)
  } catch (error) {
    return error
  }
}
