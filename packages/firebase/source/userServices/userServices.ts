import { auth, database } from "./firebase"


export interface IUser {
 displayName: string | null
 email?: string
 emailVerified?: boolean
 uid?: string
 photoURL: string | null
 providerData?: string
 refreshToken?: string
}


export async function createUser(
  email: string,
  password: string,
  username: string,
) {
  if (!email) throw Error("auth/no-email")
  if (!password) throw Error("auth/no-password")
  if (!username) throw Error("auth/no-username")
  await auth().createUserWithEmailAndPassword(email, password)

  const user = auth().currentUser
  if (!user) throw Error("auth/not-logged-in")

  await updateCurrentUser({
    displayName: username,
    photoURL: null,
  })

  auth().useDeviceLanguage()
  await user.sendEmailVerification()
}

/**
 * Delete the currently logged-in user
 */
export async function deleteUser() {
  const currentUser = auth().currentUser
  if (!currentUser) return

  await database()
    .ref(`/users/${currentUser.uid}`)
    .remove()

  currentUser.delete()
}

/**
 * Get user's data via UID
 * @param {string} uid User ID
 */
export async function readUser(uid: string) {
  const userSnapshot = await database()
    .ref(`users/${uid}`)
    .once("value")

  return userSnapshot.val()
}

/**
 * Update a user's data via object with desired property changes
 * @param {object} updates
 * @property {string|null} displayName User's name
 * @property {string|null} photoURL User's avatar
 */
export async function updateCurrentUser({
  displayName = null,
  photoURL = null,
}: IUser) {
  const user = auth().currentUser
  if (!user) throw Error("user/no-user-authenticated")

  return user.updateProfile({
    displayName,
    photoURL,
  })
}
