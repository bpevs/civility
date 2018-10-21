Philosophy
==========
The root store handles all of our different Stores, and connects them to Redux.

A user will interact with this only to map a Store to a Service. Everything else is done via our provided root classes.

```js
import {
  CommentStore,
  mapStores,
  RouteStore,
  UserStore
} from "@civility/stores"

import {
  CommentServices,
  RouteServices,
  UserServices,
} from "@civility/firebase"

mapStores({
  CommentStore: CommentServices,
  RouteServices: RouteServices,
  UserServices: UserServices,
})
```
