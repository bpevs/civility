import { schemaMiddleware } from "./schemaMiddleware"

const mockProvider = {
  deleteItem: jest.fn(),
  fetchItem: jest.fn(),
  postItem: jest.fn(),
  putItem: jest.fn(),
}

const mockSchemas = {
  items: {
    fetchItem: {
      method: "create"
    }
  }
}


test.skip("Passes through actions that don't match a provider method", () => {
  const { next, invoke } = createSchemaMiddleware(mockSchemas, mockProvider)
  const action = { type: "TEST" }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})
​
test.skip("calls the function", () => {
  const { invoke } = createSchemaMiddleware()
  const fn = jest.fn()
  invoke(fn)
  expect(fn).toHaveBeenCalled()
})
​
test.skip("passes dispatch and getState", () => {
  const { store, invoke } = createSchemaMiddleware()
  invoke((dispatch, getState) => {
    dispatch("TEST DISPATCH")
    getState()
  })
  expect(store.dispatch).toHaveBeenCalledWith("TEST DISPATCH")
  expect(store.getState).toHaveBeenCalled()
})

function createSchemaMiddleware(schema, provider) {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()
​
  const invoke = action => schemaMiddleware(schema, provider)(store)(next)(action)
​
  return { store, next, invoke }
}
