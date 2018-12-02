Promisify
=========
Wraps async Node.js methods as Promises.

How to use
----------
```js
import fs from "fs";
const readdir$ = promisify(fs.readdir);

// We can now use our readdir$ method as a promise.
readdir$("mydirectory")
  .then(
    data => Promise.resolve(data),
    error => Promise.reject(error)
  )
  .then(data => console.log(data))
  .catch(error => console.log(error));
```
