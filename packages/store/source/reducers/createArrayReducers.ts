export interface IArrayActionState {
  type: string
  payload: { [key: string]: any }
}

/**
 * Creates a set of reducers meant to deal with arrays
 * @param name name of collection
 * @param keyBy key to reference items
 */
export function createArrayReducers(name: string) {
  const initialState: any[] = []

  return {
    pop: (state: any[] = initialState): any[] => {
      const nextState = [ ...state ]
      nextState.pop()
      return nextState
    },

    push: (
      state: any[] = initialState,
      action: IArrayActionState,
    ): any[] => {
      const nextState = [ ...state ]
      nextState.push(action.payload)
      return nextState
    },

    shift: (state: any[] = initialState): any[] => {
      const nextState = [ ...state ]
      nextState.shift()
      return nextState
    },

    unshift: (
      state: any[] = initialState,
      action: IArrayActionState,
    ): any[] => {
      const nextState = [ ...state ]
      nextState.unshift(action.payload)
      return nextState
    },
  }
}
