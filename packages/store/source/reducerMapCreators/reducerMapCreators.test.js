import * as reducerMapCreators from "./reducerMapCreators"

test("Should export createArrayReducerMap", () => {
  expect(reducerMapCreators.createArrayReducerMap).toBeDefined()
})

test("Should export createMapReducerMap", () => {
  expect(reducerMapCreators.createMapReducerMap).toBeDefined()
})
