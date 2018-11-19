import { Obj } from "@civility/utilities"
import { ReducersMapObject } from "redux"
import { IPayloadAction } from "../../actions/actions"


/**
 * Creates a set of reducers meant to deal with maps
 * @param keyBy key to reference items
 * @returns set of map reducers
 */
export function createMapReducerMap(keyBy: string): ReducersMapObject {
  return {
    create: (
      state: Obj<any> = {},
      action: IPayloadAction<any>,
    ): Obj<any> => {
      const key = action.payload[keyBy]
      const nextState = { ...state }
      nextState[key] = action.payload
      return nextState
    },

    delete: (
      state: Obj<any> = {},
      action: IPayloadAction<any>,
    ): Obj<any> => {
      const key = action.payload[keyBy]
      const nextState = { ...state }
      delete nextState[key]
      return nextState
    },

    update: (
      state: Obj<any> = {},
      action: IPayloadAction<any>,
    ): Obj<any> => {
      const key = action.payload[keyBy]
      const nextState = { ...state }
      nextState[key] = { ...nextState[key], ...action.payload }
      return nextState
    },
  }
}
