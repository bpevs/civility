Philosophy
==========
The root store handles all of our different Stores, and connects them to Redux. Both `Stores` and `Store` are singletons. They will always export a single instance of a store, and are non-repeatable. DO NOT make two stores that deal with the same data.

A user will interact with this only to map a Store to a Service. Everything else is done via our provided root classes.

```js
import {
  CommentStore,
  defineServices,
  RouteStore,
  UserStore
} from "@civility/stores"

import {
  CommentServices,
  RouteServices,
  UserServices,
} from "@civility/firebase"
```
