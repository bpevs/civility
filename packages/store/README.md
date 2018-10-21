Philosophy
==========
**Stores**
Stores organize how our app consumes data; it defines how we transfer of information from our services to our components. Think of it like an actual supply-chain.

- Our Services provide the stores with products
- Our Stores define how a consumer gets the product it wants
- Our Components and Pages define how a consumer uses the product it purchases

Our stores are both B2B and B2c, though (they provide data to both to our Consumers, and also to other Stores), for the convenience of its consumers.


Types of Stores
--------------
Getting back to programming terminology, we have 2 kinds of Stores:

**AppStore**
State of interaction within the experience of an application. Some examples of this are:
- Active Overlays
- Sign-in State
- Tracking Error States
- Routing

**CollectionStore**
Data where a collection is greater than the span of the current user.
- Users
- Comments


Usage
======
The store is initialized when we import a `Component` or `Page` Class. So there isn't actually much configuration at all, if you are using built-in stores. This usage will more dictate how we create stores, so you can override them effectively.

```js
import { Store } from "@civility/store"

// Define a new store by extending the Store class. We'll define a User store.
class Users extends Store {
  service = null // Service powering this store
  state = {} // Default State

  constructor() {
    super()
  }

  // Action Creators
  actions = {
    // Extended with the correct callAPI
    async createUser(username, password) {
      return {
        type: "CREATE_USER",
        payload: { password, username },
      }
    }
  }

  // Reducer
  async onUpdate() {

  }
}
```


```js
import { Store } from "@civility/store"

class Route extends Store {
  state = {}

  constructor() {

  }
}
```
