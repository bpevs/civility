export interface IFirebaseOptions {
  apiKey: string
  authDomain?: string
  databaseURL?: string
  storageBucket?: string
}

export interface IFirebase {
  auth: () => any,
  database: () => any,
  storage: () => any,
}

let resolveFirebase: (key: IFirebase) => void
let firebaseInstance: any

export const firebase = new Promise((resolve: (key: IFirebase) => void) => {
  if (firebaseInstance) resolve(firebaseInstance)
  else resolveFirebase = resolve
})

export async function initialize(
  options: IFirebaseOptions,
): Promise<void> {
  const fb = require("firebase/app")

  if (!firebaseInstance && fb && !fb.apps.length) {
    fb.initializeApp(options)
  }

  if (resolveFirebase) {
    resolveFirebase(firebaseInstance)
  } else {
    firebaseInstance = {
      auth: require("firebase/auth"),
      database: require("firebase/database"),
      storage: require("firebase/storage"),
    }
  }
}
