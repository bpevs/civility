import { Func, isObject, isString } from "@civility/utilities"
import { getService } from "../services/registerServices"


export interface IAction<ActionType> {
  readonly type: ActionType
}

export interface IAPIAction<ActionType, PayloadType> {
  readonly payload: PayloadType
  readonly shouldCallAPI?: (...args: any[]) => boolean
  readonly type: ActionType
}

export type IAsyncAction<PayloadType> = IAPIAction<ActionType, PayloadType> | Func

export type ActionCreator = (...args: any[]) => ActionTypes

export function isAction(item: any): item is IAction<any> {
  return isObject(item) && isString(item.type)
}

export function isAPIAction(item: any): item is IAPIAction<any, any> {
  return isAction(item) && Boolean(getService(item.type))
}

// ACTION TYPES
// ––––––––––––
import { CreateOverlay, DeleteOverlay } from "./overlayActionCreators/overlayActionCreators"
import { ICreateUser } from "./userActionCreators/userActionCreators"

export enum ActionType {
  CREATE_OVERLAY = "CREATE_OVERLAY",
  DELETE_OVERLAY = "DELETE_OVERLAY",
  CREATE_USER = "CREATE_USER",
  OTHER = "__any_other_action_type__",
}

export type ActionTypes =
  | CreateOverlay
  | ICreateUser
  | DeleteOverlay
  | IAction<ActionType.OTHER>

export {
  ICreateUser,
  CreateOverlay,
  DeleteOverlay,
}
