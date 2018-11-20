import { createStore } from "./createStore"
import { createMapReducerMap } from "../reducerMapCreators/reducerMapCreators"

const mockProvider = {
  onlyProvider: jest.fn(),
  asyncGet: jest.fn(() => Promise.resolve({ id: "myID" })),
  asyncFail: jest.fn(() => Promise.reject("ded")),
  syncGet: jest.fn(() => ({ data: "data" })),
}

const mockSchemas = {
  items: {
    reducerMap: createMapReducerMap("id"),
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


test("Store should have default state", () => {
  const store = createStore({}, mockProvider, mockSchemas)
  expect(store.getState()).toEqual({ items: {} })
})

test("Should be able to update store, dispatching a civil action", async () => {
  const store = createStore({}, mockProvider, mockSchemas)

  await store.dispatch({ type: "asyncGet" })

  expect(store.getState()).toEqual({
    items: {
      myID: { id: "myID" }
    }
  })
})
