import { createReducerFromSchema } from "./createReducerFromSchema"

test("Should create a reducer that returns initial state", () => {
  const initialState = "hello"
  const reducer = createReducerFromSchema(initialState, {
    behaviors: {},
    reducerMap: {},
  })
  expect(reducer(undefined, { type: "undefined" })).toBe(initialState)
})

test.skip("Should create a reducer that can handle actions", () => {})
