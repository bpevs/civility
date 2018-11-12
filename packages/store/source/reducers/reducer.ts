import { ActionTypes } from "../actions/actions"

export function createReducer(init: any, handlers: any) {
  return function reducer(state = init, action: ActionTypes) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}
