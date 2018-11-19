import { Reducer } from "redux"
import { IPayloadAction } from "../../actions/actions"


export interface IArrayReducerMap {
  pop: Reducer
  push: Reducer
  shift: Reducer
  unshift: Reducer
}


/**
 * Creates a set of reducers meant to deal with arrays
 * @returns set of array reducers
 */
export function createArrayReducerMap(): IArrayReducerMap {
  return {
    pop: (
      state: any[] = [],
      action: IPayloadAction<any>,
    ): any[] => {
      const nextState = [ ...state ]
      nextState.pop()
      return nextState
    },

    push: (
      state: any[] = [],
      action: IPayloadAction<any>,
    ): any[] => {
      const nextState = [ ...state ]
      nextState.push(action.payload)
      return nextState
    },

    shift: (
      state: any[] = [],
      action: IPayloadAction<any>,
    ): any[] => {
      const nextState = [ ...state ]
      nextState.shift()
      return nextState
    },

    unshift: (
      state: any[] = [],
      action: IPayloadAction<any>,
    ): any[] => {
      const nextState = [ ...state ]
      nextState.unshift(action.payload)
      return nextState
    },
  }
}
