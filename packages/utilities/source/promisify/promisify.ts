import { Func } from ".."


export function promisify(toPromisify: Func): () => Promise<any> {
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
