import { Obj } from "@civility/utilities"
import { ReducersMapObject } from "redux"


export interface IBehavior {
  async?: boolean
  expect?: any
  method: string
  require?: any
}

export interface ISchema {
  reducerMap: ReducersMapObject
  behaviors: Obj<IBehavior>
}

export function createSchema(
  reducerMap: ReducersMapObject,
  behaviors: Obj<IBehavior>,
): ISchema {
  return {
    behaviors,
    reducerMap,
  }
}
