import { createMapReducerMap } from "./createMapReducerMap"


test("Should create a map of Array reducer methods", () => {
  const reducers = createMapReducerMap("id")
  reducers.create(undefined, { type: "hello", payload: {} })
  reducers.delete(undefined, { type: "hello", payload: {} })
  reducers.update(undefined, { type: "hello", payload: {} })
})

test("Create should add item to state", () => {
  const reducers = createMapReducerMap("id")
  const result = reducers.create({}, {
    payload: { id: "one", value: 1 },
    type: "create",
  })

  expect(result).toEqual({
    one: { id: "one", value: 1 },
  })
})

test("Delete should delete item from state", () => {
  const initialState = { one: { id: "one", value: 1 } }
  const reducers = createMapReducerMap("id")
  const result = reducers.delete(initialState, {
    payload: { id: "one" },
    type: "delete",
  })

  expect(result).toEqual({})
})

test("Update should update existing item in state", () => {
  const initialState = { one: { id: "one", value: 1 } }
  const reducers = createMapReducerMap("id")
  const result = reducers.update(initialState, {
    payload: { id: "one", value: 2 },
    type: "update",
  })

  expect(result).toEqual({
    one: { id: "one", value: 2 },
  })
})
