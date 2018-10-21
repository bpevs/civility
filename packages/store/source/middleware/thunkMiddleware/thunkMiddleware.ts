import { Func, isFunction } from "@civility/utilities"
import { IAsyncAction } from "../../actions/actions"
import { Store } from "../../store/store"
import { Middleware } from "../createMiddleware/createMiddleware"


function thunk(store: Store, next: Func, action: IAsyncAction<any>) {
  const { dispatch, getState } = store
  // Normal action: pass it on
  if (isFish(action)) return action(dispatch, getState)
  return next(action)
}

const isFish = (action: IAsyncAction<any>): action is Func => Boolean(isFunction(action))

export const thunkMiddleware: Middleware = new Middleware(thunk)
