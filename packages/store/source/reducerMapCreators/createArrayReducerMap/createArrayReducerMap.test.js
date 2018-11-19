import { createArrayReducerMap } from "./createArrayReducerMap"


test("Should create a map of Array reducer methods", () => {
  const reducers = createArrayReducerMap()
  reducers.pop(undefined, { type: "hello" })
  reducers.push(undefined, { type: "hello" })
  reducers.shift(undefined, { type: "hello" })
  reducers.unshift(undefined, { type: "hello" })
})

test("Pop should pop from state array", () => {
  const reducers = createArrayReducerMap()
  const result = reducers.pop([ 1, 2, 3 ], { type: "pop" })
  expect(result).toEqual([ 1, 2 ])
})

test("Push should push to state array", () => {
  const reducers = createArrayReducerMap()
  const result = reducers.push([ 1, 2, 3 ], {
    payload: 4,
    type: "push",
  })
  expect(result).toEqual([ 1, 2, 3, 4 ])
})

test("Shift should shift from state array", () => {
  const reducers = createArrayReducerMap()
  const result = reducers.shift([ 1, 2, 3 ], { type: "shift" })
  expect(result).toEqual([ 2, 3 ])
})

test("Unshift should unshift to state array", () => {
  const reducers = createArrayReducerMap()
  const result = reducers.unshift([ 1, 2, 3 ], {
    payload: 0,
    type: "push",
  })
  expect(result).toEqual([ 0, 1, 2, 3 ])
})
