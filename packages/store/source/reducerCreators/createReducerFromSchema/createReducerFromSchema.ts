import { forEach } from "@civility/utilities"
import { Reducer, ReducersMapObject } from "redux"
import { IBehavior, ISchema } from "../../schemas/schemas"
import { createReducerFromMap } from "../createReducerFromMap/createReducerFromMap"


/**
 * Creates a reducer from a Civility Schema
 * @param initialState - The initial reducer state
 * @param schema - A Civility Schema
 * @returns Redux reducer function
 */
export function createReducerFromSchema(
  initialState: any = {},
  schema: ISchema,
): Reducer {
  const reducersByAction: ReducersMapObject = {}

  forEach(schema.behaviors, (action: IBehavior, actionType: string) => {
    const reducer = schema.reducerMap[action.method]
    if (reducer) {
      reducersByAction[actionType] = reducer
      reducersByAction[actionType + "Success"] = reducer
    }
  })

  return createReducerFromMap(initialState, reducersByAction)
}
