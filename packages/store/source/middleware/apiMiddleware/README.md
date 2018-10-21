apiMiddleware
================
This redux middleware utility makes it trivial and descriptive to do [asynchronous Redux actions using Promises](https://redux.js.org/docs/recipes/ReducingBoilerplate.html#async-action-creators).

How to Use
----------
We need to include this middleware and redux-thunk in the initial setup of our Redux Store:
```js
import { apiMiddleware } from "@zuck/core";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers/reducers";

let store = null;

function storeCreator(initialState = {}) {
  const middleware = [
    thunkMiddleware,
    apiMiddleware
  ];

  store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );

  return store;
}
```

Then we can use it for creating asynchronous actionCreators. We give it three action types, for the request, success, and failure cases. We also give an action a aPI method, and any additional info we want to pass to the payload. It's pretty straightforward to just read as an action. Here's an example we use for [FridayPoetry.org](https://fridaypoetry.org):

```js
function createPoem(poem) {
  return {

    // Method to be called for taking action
    callAPI() { return services.createPoem(poem); },

    // Gets passed directly to the return payload.
    payload: { poem },

    // Types are always in the same order; request, success, then failure
    types: [
      types.CREATE_POEM_REQUEST,
      types.CREATE_POEM_SUCCESS,
      types.CREATE_POEM_FAILURE
    ]
  };
}
```

The Promise then resolves to wherever the action was dispatched:
```js
dispatch(createPoem(poemContentToPost))
  .then(({ payload, type }) => {
      if (type === "CREATE_POEM_SUCCESS") {
        route(`/poem/${payload.poemId}`);
      }
  });
```
