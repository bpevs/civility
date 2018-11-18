import { Func, isObject, isString } from "@civility/utilities"
import { getService } from "../services/registerServices"


export interface IAction<ActionType> {
  readonly type: ActionType
}

export interface IPayloadAction<ActionType> {
  readonly type: ActionType
  readonly payload: { [key: string]: any }
}

export interface IAPIAction<ActionType, PayloadType> {
  readonly payload: PayloadType
  readonly shouldCallAPI?: (...args: any[]) => boolean
  readonly type: ActionType
}

export type IAsyncAction<PayloadType> = IAPIAction<string, PayloadType> | Func

export type ActionCreator = (...args: any[]) => IAction<any>

export function isAction(item: any): item is IAction<any> {
  return isObject(item) && isString(item.type)
}

export function isAPIAction(item: any): item is IAPIAction<any, any> {
  return isAction(item) && Boolean(getService(item.type))
}
