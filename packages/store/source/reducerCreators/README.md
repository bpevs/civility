# Reducer Creators

A significant amount of redux boilerplate is caused by creating the same reducers over and over. Civility assumes certain patterns of reducers will be used, so that if we organize around specific principles, we can greatly reduce the amount of boilerplate code necessary.

## `createReducerFromMap`

This creates a single reducer function from a map of reducer functions, assuming a shared state between these reducers. If you want to combine reducers using separate states for each, you want Redux's [`combineReducers`](https://redux.js.org/api/combinereducers). Example usage of [createReducerFromMap](./createReducerFromMap/createReducerFromMap.ts) is in the [createReducerFromMap test file](./createReducerFromMap/createReducerFromMap.test.js).


## Reducer Map Creators

[Reducer map creators](../reducerMapCreators) are functions that create maps of reducers, expected to interact with specific structures of data. It is important to note that these functions do NOT create the actual reducers themselves, but maps of reducers. This allows us to modify/rename the individual reducers. If you want a direct reducer, you can use `createReducerFromMap`.

#### Example:
```js
const initialState = {}

// Create a set of map reducers, that expect to index the map by id
const overlayReducersMap = createMapReducerMap("id")
const overlayReducer = createReducerFromMap(initialState, {
  CREATE_OVERLAY: overlayReducersMap.create,
  DELETE_OVERLAY: overlayReducersMap.delete,
  // UPDATE_OVERLAY: overlayReducersMap.update
})

const payload = { id: "overlay1", children: "overlay 1" }
const action = { type: "CREATE_OVERLAY", payload: payload }

// Same reducer as last example, that responds to CREATE_OVERLAY and DELETE_OVERLAY
// with a shared state of { [overlayId]: [overlayChildren] }
overlayReducer(undefined, action)
```



## `createReducerFromSchema`

This is the last level of abstraction of our reducers. If we pass a Reducer Map Creator into our schema, we can effectively ignore the definition of actionTypes in our reducer. This is done internal to Civility when you use Civility's `createStore`, so you probably won't need to worry about using this function.

#### Example:
```js
import { createMapReducerMap } from "@civility/store"
import { isNil, isString } from "@civility/utilities"

const overlayReducersMap = createMapReducerMap("id")
const overlaySchema = {
  CREATE_OVERLAY: {
    method: "create",
    require: {
      id: isString,
      children: item => !isNil(item),
    }
  },

  DELETE_OVERLAY: {
    method: "delete",
    require: {
      id: isString,
    }
  }
}

const overlayReducer = createReducerFromSchema(initialState, overlaySchema, overlayReducersMap)

const payload = { id: "overlay1", children: "overlay 1" }
const action = { type: "CREATE_OVERLAY", payload: payload }

// Same reducer again, that responds to CREATE_OVERLAY and DELETE_OVERLAY
// with a shared state of { [overlayId]: [overlayChildren] }
// Gains support from schema validation, and support for async design around synchronous reducers
// Meaning
overlayReducer(undefined, action)
```

#### Async

`createReducerFromSchema` also can make assumptions based off asynchronous designs, which makes it more valuable

```js
const overlaySchema = {
  POST_OVERLAY: {
    async: true,
    method: "create",
    require: {
      id: isString,
      children: item => !isNil(item),
    }
  }
}
```

This example will add the following reactions to the reducer:
- POST_OVERLAY - synchronous updates
- POST_OVERLAY_REQUEST - asynchronous update has started
- POST_OVERLAY_SUCCESS - asynchronous update has succeeded
- POST_OVERLAY_FAILURE - asynchronous update failed

Also, the "pending" and "error" reducers watch for these particular patterns, if you're using the Civility store.
