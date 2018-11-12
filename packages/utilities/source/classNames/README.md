classNames
================
Combines className strings


How to Use
----------
We can combine classes in a few different ways

### Strings or Numbers
  - Joins all arguments together as a string
  - Ignores items that are not strings or numbers

```js
import { classNames } from "@zuck/core"

classNames("hello", "my", 1, "class")
// > "hello my 1 class"

classNames("hello my   ", null, 1, "class")
// > "hello my    1 class"
```

### Arrays
Joins numbers and strings of the collection

```js
import { classNames } from "@zuck/core"

classNames([ "hello", "my", 1, "class" ])
// > "hello my 1 class"

classNames([ "hello my   ", null, 1, "class" ])
// > "hello my    1 class"
```

### Objects
Joins each object key that has a truthy value.

```js
classNames({
  hello: null,
  my: true,
  lalala: false,
  className: true
})
// > "my className"
```
