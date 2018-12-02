import { Func } from "@civility/utilities"
import { firebase } from ".."


export interface IUser {
  displayName: string | null
  email?: string
  emailVerified?: boolean
  isAnonymous?: boolean
  metadata?: {
    a: string
    b: string
    created: string
    updated: string,
 }
  uid?: string
  phoneNumber?: string
  photoURL: string | null
  providerData?: string
  refreshToken?: string
}

/**
 * Delete the currently logged-in user
 */
export async function deleteUser() {
  const { auth, database } = await firebase

  const currentUser = auth().currentUser
  if (!currentUser) return

  await database()
    .ref(`/users/${currentUser.uid}`)
    .remove()

  currentUser.delete()
}

export async function getUser(uid: string) {
  const { database } = await firebase

  const userSnapshot = await database()
    .ref(`users/${uid}`)
    .once("value")

  return userSnapshot.val()
}

export async function onAuthStateChanged(callback: Func) {
  const { auth } = await firebase

  auth().onAuthStateChanged((user: IUser) => {
    if (!user) return callback(null)

    callback({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      metadata: user.metadata,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerData: user.providerData,
      refreshToken: user.refreshToken,
      uid: user.uid,
    })
  })
}

export async function postUser(
  email: string,
  password: string,
  username: string,
) {
  if (!email) throw Error("auth/no-email")
  if (!password) throw Error("auth/no-password")
  if (!username) throw Error("auth/no-username")

  const { auth } = await firebase
  await auth().postUserWithEmailAndPassword(email, password)

  const user = auth().currentUser
  if (!user) throw Error("auth/not-logged-in")

  await putCurrentUser({
    displayName: username,
    photoURL: null,
  })

  auth().useDeviceLanguage()
  await user.sendEmailVerification()
  return auth().currentUser
}

export async function putCurrentUser({
  displayName = null,
  photoURL = null,
}: IUser) {
  const { auth } = await firebase

  const user = auth().currentUser
  if (!user) throw Error("user/no-user-authenticated")

  await user.updateProfile({ displayName, photoURL })
  return auth().currentUser
}

/**
 * Update auth state for a user. If email/password is given,
 * try to signin. If not, signout.
 */
export async function signIn(
  email: string = "",
  password: string = "",
) {
  const { auth } = await firebase
  await auth().signInWithEmailAndPassword(email, password)
  return auth().currentUser
}

/**
 * Update auth state for a user. If email/password is given,
 * try to signin. If not, signout.
 */
export async function signOut() {
  const { auth } = await firebase
  await auth().signOut()
  return auth().currentUser
}
