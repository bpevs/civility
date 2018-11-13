Philosophy
==========
**Stores**
Stores organize how our app consumes data; it defines how we transfer of information from our services to our components. Think of it like an actual supply-chain.

- Our Providers provide the stores with products
- Our Stores define how a consumer gets the product it wants
- Our Components and Pages define how a consumer uses the product it purchases

Our stores are both B2B and B2c, though (they provide data to both to our Consumers, and also to other Stores), for the convenience of its consumers.

Usage
======
The store is initialized when we import a `Component` or `Page` Class. So there isn't actually much configuration at all, if you are using built-in stores. This usage will more dictate how we create stores, so you can override them effectively.

```js
import { createStore, userSchema as users } from "@civility/store"
import * as provider from "@civility/firebase"
import * as reducers from "./partials"
import { apiKey authDomain databaseURL storageBucket } from "./constants"

// Firebase-specific setup
provider.initialize({ apiKey authDomain databaseURL storageBucket })

const store = createStore({
  provider,
  schema: { users }
})


var user = await store.createUser({ username, password, email })

user = store.readUser({ uid: user.uid })
```

```js
import { createReducer, Store } from "@civility/store"
import { isString } from "@civility/utilities"

export const userStore = {
  createUser: {
    async: true,
    require: {
      username: isString,
      password: isString,
      email: isString,
    },
    respond: null,
    reducer: collectionReducerKeyBy("uid")
  },

  readUser: {
    async: true,
    require: {
      uid: isString
    },
    respond: {
      username: String,
      password: String,
      email: String,
    },
    reducer: collectionReducerKeyBy("uid")
  }
}
```
