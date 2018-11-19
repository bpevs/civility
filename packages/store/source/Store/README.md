Philosophy
==========
Our store connects our reducers and serviceProviders via middleware and schema.


```js
// Store layouts
import { createStore } from "@civility/stores"
import * as FirebaseProvider from "@civility/firebase"

const initialState = {}

// Providers are just large maps of functions, keyed by actionType.
// The setup syntax may be different depending on the source of your provider.
const provider = new FirebaseProvider({ apiKey authDomain databaseURL storageBucket })

// All our schemas define the state of our app.
// Civility should also automatically add "error" and "pending" schemas
// This defines the shape of our store's state.
const schemas = { users: userSchema }

// Returns an actual Redux store. We use our schema and middleware to automatically
// map actions to the correct provider methods
const store = createStore({ initialState, provider, schemas })

// Dispatches 'CREATE_USER_REQUEST' and 'CREATE_USER_SUCCESS'/'CREATE_USER_FAILURE'
store.​dispatch({
  type: "createUser",
  payload: {
    id: "my-user-name",
  }
})
```
