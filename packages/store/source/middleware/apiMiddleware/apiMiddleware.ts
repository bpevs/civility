import { Middleware } from "redux"
import { isAPIAction } from "../../actions/actions"
import { ISchema } from "../../schema/schema";
import { IProvider } from "../../Store/Store";
import { createMiddleware } from "../createMiddleware/createMiddleware"


function api(
  store: any,
  next: (...args: any[]) => any,
  action: any,
  schema: ISchema,
  provider: IProvider,
) {
  if (!isAPIAction(action)) return next(action)

  const { dispatch, getState } = store
  const { shouldCallAPI, type, payload = {} } = action

  const service = provider[action.type]

  // If we shouldn't call the API, we are done
  if (shouldCallAPI && !shouldCallAPI(getState())) return

  dispatch({ payload, type: type + "_START" })

  return service(action).then(
    (response: any) => dispatch({
      payload: { ...payload, ...response },
      type: type + "_SUCCESS",
    }),
    (error: any) => dispatch({
      payload: { ...payload, error },
      type: type + "_FAILURE",
    }),
  )
}


export function apiMiddleware(
  schema: ISchema,
  provider: IProvider,
): Middleware {
  return createMiddleware(api, schema, provider)
}
