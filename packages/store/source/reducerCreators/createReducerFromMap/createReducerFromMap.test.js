import { createReducerFromMap } from "./createReducerFromMap"

test("Should create a reducer that returns initial state", () => {
  const initialState = "hello"
  const reducer = createReducerFromMap(initialState, {})
  expect(reducer(undefined, { type: "undefined" })).toBe(initialState)
})

test("Should create a reducer that can handle actions", () => {
  const initialState = {}

  const overlayReducer = createReducerFromMap(initialState, {
    CREATE_OVERLAY: (state, action) => {
      const { id, children } = action.payload
      const nextState = Object.assign({}, state)
      nextState[id] = children
      return nextState
    },

    DELETE_OVERLAY: (state, action) => {
      const { id } = action.payload
      const nextState = Object.assign({}, state)
      delete nextState[id]
      return nextState
    },
  })

  const overlay1 = { children: "overlay one", id: "overlay1" }
  const overlay2 = { children: "overlay two", id: "overlay2" }

  // Add one overlay
  const firstState = overlayReducer(undefined, {
    type: "CREATE_OVERLAY",
    payload: overlay1,
  })

  expect(firstState).toEqual({
    [overlay1.id]: overlay1.children,
  })


  // Add a second overlay
  const secondState = overlayReducer(firstState, {
    type: "CREATE_OVERLAY",
    payload: overlay2,
  })

  expect(secondState).toEqual({
    [overlay1.id]: overlay1.children,
    [overlay2.id]: overlay2.children,
  })


  // Remove the first overlay
  const thirdState = overlayReducer(secondState, {
    type: "DELETE_OVERLAY",
    payload: { id: overlay1.id },
  })

  expect(thirdState).toEqual({ [overlay2.id]: overlay2.children })
})
