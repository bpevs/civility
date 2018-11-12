import { Func } from "@civility/utilities"
import { firebase } from "../initialize"


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


export async function createUser(
  email: string,
  password: string,
  username: string,
) {
  if (!email) throw Error("auth/no-email")
  if (!password) throw Error("auth/no-password")
  if (!username) throw Error("auth/no-username")

  const { auth } = await firebase
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
  const { auth, database } = await firebase

  const currentUser = auth().currentUser
  if (!currentUser) return

  await database()
    .ref(`/users/${currentUser.uid}`)
    .remove()

  currentUser.delete()
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


export async function readUser(uid: string) {
  const { database } = await firebase

  const userSnapshot = await database()
    .ref(`users/${uid}`)
    .once("value")

  return userSnapshot.val()
}

/**
 * Update auth state for a user. If email/password is given,
 * try to signin. If not, signout.
 */
export async function updateAuthState(
  email: string = "",
  password: string = "",
) {
  const { auth } = await firebase
  if (!email && !password) return auth().signOut()
  return auth().signInWithEmailAndPassword(email, password)
}


export async function updateCurrentUser({
  displayName = null,
  photoURL = null,
}: IUser) {
  const { auth } = await firebase

  const user = auth().currentUser
  if (!user) throw Error("user/no-user-authenticated")

  return user.updateProfile({
    displayName,
    photoURL,
  })
}
