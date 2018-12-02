import { Func } from ".."


export function times(times: number, func: Func): any[] {
  const result = []

  for (let index = 0; index < times; index++) {
    result.push(func(index))
  }

  return result
}
