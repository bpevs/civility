import { assign, isArray, isFunction, isNumber, isString, isSymbol } from "lodash-es";
import { IAction, IApiAction } from "../../actions/actions";
import { createMiddleware } from "../createMiddleware/createMiddleware";


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
      payload: assign({}, payload, response),
      type: successType,
    }),
    (error: any) => dispatch({
      payload: assign({}, payload, { error }),
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
  return isNumber(type) || isString(type) || isSymbol(type);
}


export const apiMiddleware: (...args: any[]) => any = createMiddleware(api);
