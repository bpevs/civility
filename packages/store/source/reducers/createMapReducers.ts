export interface IMapReducerState {
  [key: string]: any
}

export interface IMapActionState {
  type: string
  payload: { [key: string]: any }
}

/**
 * Creates a set of reducers meant to deal with maps
 * @param name name of collection
 * @param keyBy key to reference items
 */
export function createMapReducers(name: string, keyBy: string) {
  const initialState = {}

  return {
    create: (
      state: IMapReducerState = initialState,
      action: IMapActionState,
    ): IMapReducerState => {
      const key = action.payload[keyBy]
      const nextState = { ...state }
      nextState[key] = action.payload
      return nextState
    },

    delete: (
      state: IMapReducerState = initialState,
      action: IMapActionState,
    ): IMapReducerState => {
      const key = action.payload[keyBy]
      const nextState = { ...state }
      delete nextState[key]
      return nextState
    },

    update: (
      state: IMapReducerState = initialState,
      action: IMapActionState,
    ): IMapReducerState => {
      const key = action.payload[keyBy]
      const nextState = { ...state }
      nextState[key] = { ...nextState[key], ...action.payload }
      return nextState
    },
  }
}
