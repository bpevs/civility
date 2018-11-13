Philosophy
==========
The root store handles all of our different Stores layouts, and connects them to Redux.

A user will interact with this only to map a Store to a Service. Everything else is done via our provided root classes.

```js
// Store layouts
import {
  commentLayout,
  defineServices,
  routeLayout,
  userLayout
} from "@civility/stores"

// Maps of service functions
import {
  commentProvider,
  routeProvider,
  userProvider,
} from "@civility/firebase"
```
