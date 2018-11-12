export interface IFirebaseOptions {
  apiKey: string
  authDomain?: string
  databaseURL?: string
  storageBucket?: string
}

export async function initialize(options: IFirebaseOptions) {
  const firebase = await import("firebase")

  if (!firebase.apps.length) {
    firebase.initializeApp(options)
  }

  return {
    auth: firebase.auth,
    database: firebase.database,
    storage: firebase.storage,
  }
}

