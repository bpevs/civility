import { isNil, isString } from "@civility/utilities"
import { ActionType, IAPIAction } from "../actions"


export interface IUser {
  created: number
  displayName: string
  email?: string
  uid: string
}

export function isUser(item: any): item is IUser {
  return !isNil(item)
    && item.created
    && item.displayName
    && item.uid
    && (isNil(item.email) || isString(item.email))
}

export interface ICreateUser extends IAPIAction<ActionType.CREATE_USER, IUser> {
  readonly payload: IUser
}


// Actions
export function createUser(payload: IUser): ICreateUser {
  return {
    payload,
    type: ActionType.CREATE_USER,
  }
}
