import { isArray, isFunction, isNumber, isString } from "@civility/utilities";
import { IAction, IApiAction } from "../../actions/actions";
import { Middleware } from "../createMiddleware/createMiddleware";


function api(store: any, next: (...args: any[]) => any, action: IAction<any> | IApiAction<any>) {
  const { dispatch, getState } = store;

  // Normal action: pass it on
  if (!isApiAction(action)) return next(action);

  // If we shouldn't call the API, we are done
  if (action.shouldCallAPI && !action.shouldCallAPI(getState())) return;

  const { callAPI, types, payload = {} } = action;

  if (!isFunction(callAPI)) {
    throw new Error("Expected callAPI to be a function");
  }

  const [ requestType, successType, failureType ] = types;

  dispatch({ payload, type: requestType });

  return callAPI().then(
    (response: any) => dispatch({
      payload: { ...payload, ...response },
      type: successType,
    }),
    (error: any) => dispatch({
      payload: { ...payload,  error },
      type: failureType,
    }),
  );
}


// PRIVATE
function isApiAction(action: any): action is IApiAction<any> {
  return isArray(action.types) &&
  action.types.length === 3 &&
  action.types.every(isActionType);
}

function isActionType(type: any) {
  return isNumber(type) || isString(type);
}


export const apiMiddleware: (...args: any[]) => any = new Middleware(api);
