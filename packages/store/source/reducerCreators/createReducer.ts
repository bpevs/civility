import { forEach, Obj } from "@civility/utilities"
import { Reducer } from "redux"
import { IAction } from "../actions/actions"
import { IBehavior, ISchema } from "../schema/schema"


/**
 * Creates a reducer that organizes by actionType. Different from combineReducers in that
 * it assumes a shared state between reducers.
 * @param initialState - The initial reducer state ()
 * @param reducerMap - A map of reducers, keyed by ActionType
 * @returns Redux reducer function
 */
export function createReducerFromMap(initialState: any, reducerMap: any) {
  return function reducer(state = initialState, action: IAction<any>) {
    if (reducerMap.hasOwnProperty(action.type)) {
      return reducerMap[action.type](state, action)
    }

    return state
  }
}


/**
 * Creates a reducer from a Civility Schema
 * @param initialState - The initial reducer state
 * @param schema - A Civility Schema
 * @returns Redux reducer function
 */
export function createReducerFromSchema(
  initialState: any = {},
  reducerMap: Obj<Reducer>,
  schema: ISchema,
): Reducer {
  const reducersByAction: { [key: string]: Reducer } = {}

  forEach(schema, (action: IBehavior, actionType: string) => {
    const reducer = reducerMap[action.method]
    if (reducer) reducersByAction[actionType] = reducer
  })

  return createReducerFromMap(initialState, reducersByAction)
}
