import { Action } from "redux";


export function defaultService(action: Action) {
  if (!action || !action.type) throw new Error(`Invalid action ${action}`)

  console.error(`${action.type} is an api action that doesn't have a registered service!`)

  return;
}
