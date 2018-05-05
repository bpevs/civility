import { isFunction } from "lodash-es";
import { AnyFunc, IAsyncAction } from "../../actions/actions";
import { Store } from "../../store/store";
import { Middleware } from "../createMiddleware/createMiddleware";


function thunk(store: Store, next: AnyFunc, action: IAsyncAction<any>) {
  const { dispatch, getState } = store;
  // Normal action: pass it on
  if (isFish(action)) return action(dispatch, getState);
  return next(action);
}

const isFish = (action: IAsyncAction<any>): action is AnyFunc => Boolean(isFunction(action));

export const thunkMiddleware: Middleware = new Middleware(thunk);
