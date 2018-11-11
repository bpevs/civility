import { Middleware } from "redux"
import { isAPIAction } from "../../actions/actions"
import { getService } from "../../services/registerServices"
import { createMiddleware } from "../createMiddleware/createMiddleware"


function api(store: any, next: (...args: any[]) => any, action: any) {
  if (!isAPIAction(action)) return next(action)

  const { dispatch, getState } = store
  const { shouldCallAPI, type, payload = {} } = action

  const service = getService(action.type)

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


export const apiMiddleware: Middleware = createMiddleware(api)
