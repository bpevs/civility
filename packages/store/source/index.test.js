import * as store from "./index"

test("Should export public API", () => {
  // Actions
  expect(typeof store.isAction).toBe("function")

  // Middleware
  expect(typeof store.createMiddleware).toBe("function")
  expect(typeof store.schemaMiddleware).toBe("function")
  expect(typeof store.thunkMiddleware).toBe("function")

  // Reducer Creators
  expect(typeof store.createReducerFromMap).toBe("function")
  expect(typeof store.createReducerFromSchema).toBe("function")

  // Reducer Map Creators
  expect(typeof store.createArrayReducerMap).toBe("function")
  expect(typeof store.createMapReducerMap).toBe("function")

  // Schemas
  expect(typeof store.createSchema).toBe("function")
  expect(typeof store.errorSchema).toBe("object")
  expect(typeof store.userSchema).toBe("object")

  // Store
  expect(typeof store.createStore).toBe("function")
})
