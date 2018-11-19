import { forEach, Obj } from "@civility/utilities"
import { Reducer } from "redux"
import { IBehavior, ISchema } from "../../schema/schema"
import { createReducerFromMap } from "../createReducerFromMap/createReducerFromMap"


/**
 * Creates a reducer from a Civility Schema
 * @param initialState - The initial reducer state
 * @param schema - A Civility Schema
 * @returns Redux reducer function
 */
export function createReducerFromSchema(
  initialState: any = {},
  reducerMap: Obj<Reducer>,
  schema: ISchema,
): Reducer {
  const reducersByAction: { [key: string]: Reducer } = {}

  forEach(schema, (action: IBehavior, actionType: string) => {
    const reducer = reducerMap[action.method]
    if (reducer) reducersByAction[actionType] = reducer
  })

  return createReducerFromMap(initialState, reducersByAction)
}
