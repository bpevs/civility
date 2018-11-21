import { Func, isFunction } from "@civility/utilities"
import { Middleware, Store } from "redux"
import { IAsyncAction } from "../../actions/actions"
import { createMiddleware } from "../createMiddleware/createMiddleware"


function thunk(store: Store, next: Func, action: any) {
  const { dispatch, getState } = store

  if (isAsyncAction(action)) return action(dispatch, getState)

  return next(action)
}

const isAsyncAction = (action: IAsyncAction<any>): action is Func => Boolean(isFunction(action))

export const thunkMiddleware: Middleware = createMiddleware(thunk)
