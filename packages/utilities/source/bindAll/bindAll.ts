import { Obj } from ".."


export const bindAll = (
  context: Obj<any>,
  names: string[],
): void => {
  names.forEach(name => {
    context[name] = context[name].bind(context)
  })
}
