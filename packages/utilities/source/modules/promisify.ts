import { Func } from "../types"

// Promisify
// =========
// Wraps async Node.js methods as Promises.

// How to use
// ----------
// ```js
// import fs from "fs";
// const readdir$ = promisify(fs.readdir);

// // We can now use our readdir$ method as a promise.
// readdir$("mydirectory")
//   .then(
//     data => Promise.resolve(data),
//     error => Promise.reject(error)
//   )
//   .then(data => console.log(data))
//   .catch(error => console.log(error));
// ```



export function promisify(toPromisify: Func): (...args: any[]) => Promise<any | void> {
  return (...args: any[]) => new Promise((resolve: Func, reject: Func) => {
    toPromisify.apply(null, args.concat(newCallback))

    function newCallback(error: Error, ...callbackArgs: any[]): void {
      if (error) {
        reject.apply(null, [error].concat(callbackArgs))
        return
      }

      resolve.apply(null, callbackArgs)
    }
  })
}
