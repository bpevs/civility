import { Func, isObject, isString } from "@civility/utilities"


export interface IAction<ActionType> {
  readonly type: ActionType
  readonly [key: string]: any
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

export function isAction(item: any): item is IAction<any> {
  return isObject(item) && isString(item.type)
}
