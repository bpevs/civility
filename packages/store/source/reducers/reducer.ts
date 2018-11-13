import { forEach } from "@civility/utilities"
import { Reducer } from "redux"
import { ActionType, ActionTypes } from "../actions/actions"
import { IBehavior, ISchema } from "../schema/schema"

export function createReducer(init: any, handlers: any) {
  return function reducer(state = init, action: ActionTypes) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}

export function createReducerFromSchema(schema: ISchema): Reducer {
  const reducersByAction: { [key: string]: Reducer } = {}

  forEach(schema, (action: IBehavior, actionType: ActionType) => {
    reducersByAction[actionType] = action.reducer
  })

  return createReducer({}, reducersByAction)
}
