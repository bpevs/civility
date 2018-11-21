import { ReducersMapObject } from "redux"
import { IAction } from "../../actions/actions"


/**
 * Creates a reducer that organizes by actionType. Different from combineReducers in that
 * it assumes a shared state between reducers.
 * @param initialState - The initial reducer state ()
 * @param reducerMap - A map of reducers, keyed by ActionType
 * @returns Redux reducer function
 */
export function createReducerFromMap(initialState: any, reducerMap: ReducersMapObject) {
  return function reducer(state = initialState, action: IAction<any>) {
    if (reducerMap.hasOwnProperty(action.type)) {
      return reducerMap[action.type](state, action)
    }

    return state
  }
}
