import { forEach, Func, isPromise, Obj } from "@civility/utilities"
import { Middleware } from "redux"
import { IBehavior, ISchema } from "../../schemas/schemas"
import { createMiddleware } from "../createMiddleware/createMiddleware"


/**
 * If an action matches a behavior and provider within Civility, fulfill it.
 * Otherwise pass the action on.
 * @param behaviors Map of all behaviors
 * @param provider All our different async services
 */
function middleware(
  store: any,
  next: (...args: any[]) => any,
  action: any,
  behaviors: Obj<IBehavior>,
  provider: Obj<Func>,
) {
  const { payload = {}, type = "" } = action || {}
  const service = provider[type]
  const behavior = behaviors[type]
  if (!behavior || !service) return next(action)

  const { dispatch } = store

  const result = service(action)

  if (!isPromise(result)) {
    return dispatch({
      type,
      payload: { ...payload, ...service(action) },
    })
  }

  dispatch({ payload, type: type + "Start" })

  return result.then(
    (response: any) => dispatch({
      payload: { ...payload, ...response },
      type: type + "Success",
    }),
    (error: any) => dispatch({
      payload: { ...payload, error },
      type: type + "Failure",
    }),
  )
}


export function schemaMiddleware(
  schemas: Obj<ISchema>,
  provider: Obj<Func>,
): Middleware {
  const behaviors: Obj<IBehavior> = {}

  forEach(schemas, schema => {
    Object.assign(behaviors, schema.behaviors)
  })

  return createMiddleware(middleware, behaviors, provider)
}
