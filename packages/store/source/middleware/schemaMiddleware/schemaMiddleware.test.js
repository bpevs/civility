import { schemaMiddleware } from "./schemaMiddleware"

const mockProvider = {
  onlyProvider: jest.fn(),
  asyncGet: jest.fn(() => Promise.resolve()),
  asyncFail: jest.fn(() => Promise.reject("ded")),
  syncGet: jest.fn(() => ({ data: "data" })),
}

const mockSchemas = {
  items: {
    behaviors: {
      asyncFail: {
        method: "delete"
      },
      asyncGet: {
        method: "create"
      },
      onlyBehavior: {
        method: "create"
      },
      syncGet: {
        method: "update"
      }
    }
  }
}


test("Passes through bad actions", () => {
  const { next, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)
  invoke()
  expect(next).toHaveBeenCalledWith(undefined)
})

test("Passes through actions that don't match a provider method", () => {
  const { next, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)

  const action = { type: "onlyBehavior" }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})

test("Passes through actions that don't match a behavior method", () => {
  const { next, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)

  const action = { type: "onlyProvider" }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})

test("Should dispatch synchronous actions immediately", async () => {
  const { store, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)
  const action = { payload: {}, type: "syncGet" }
  await invoke(action)
  expect(store.dispatch).toHaveBeenCalledWith({
    payload: { data: "data" },
    type: "syncGet"
  })
})

test("Should dispatch asynchronous actions for success", async () => {
  const { store, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)
  const action = { payload: {}, type: "asyncGet" }
  await invoke(action)

  const [ startParams, successParams ] = store.dispatch.mock.calls
  expect(startParams[0]).toEqual({"payload": {}, "type": "asyncGetStart"})
  expect(successParams[0]).toEqual({"payload": {}, "type": "asyncGetSuccess"})
})

test("Should dispatch asynchronous actions for failures", async () => {
  const { store, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)
  const action = { payload: {}, type: "asyncFail" }
  await invoke(action)

  const [ startParams, failureParams ] = store.dispatch.mock.calls
  expect(startParams[0]).toEqual({"payload": {}, "type": "asyncFailStart"})
  expect(failureParams[0]).toEqual({
    "payload": {
      error: "ded"
    },
    "type": "asyncFailFailure"
  })
})

test.skip("Should dispatch synchronous actions for manual success and failures", () => {
  const { store, invoke } = createMockSchemaMiddleware(mockSchemas, mockProvider)
  const successAction = { payload: {}, type: "asyncGetSuccess" }
  const failureAction = { payload: {}, type: "asyncGetFailure" }
  invoke(successAction)
  invoke(failureAction)

  const [ successParams, failureParams ] = store.dispatch.mock.calls
  expect(successParams[0]).toEqual(successAction)
  expect(failureParams[0]).toEqual(failureAction)
})

​
function createMockSchemaMiddleware(schema, provider) {
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
