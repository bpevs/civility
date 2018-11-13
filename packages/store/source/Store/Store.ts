import { forEach, Func } from "@civility/utilities"
import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Middleware, Store } from "redux"
import { apiMiddleware, thunkMiddleware } from "../middleware/middleware"
import { ISchema } from "../schema/schema"


export interface IProvider {
  [key: string]: Func
}

export interface IReducers {
  [key: string]: Func
}

export interface IstoreCreatorArgs {
  initialState: object
  provider: IProvider
  schema: ISchema
}

const services = {}
let reducers = {}
let rootReducer: Func = () => ({})
let store: Store | null

function storeCreator({
  initialState = {},
  provider,
  schema,
}: IstoreCreatorArgs): Store<any, AnyAction> {
  registerProvider(provider)
  forEach(schema, (schema, name) => registerSchema(name, schema))

  const defaultMiddleware: Middleware[] = [ apiMiddleware(schema, provider), thunkMiddleware ]
  const middleware = compose(applyMiddleware(...defaultMiddleware))
  store = createStore(rootReducer, initialState, middleware);
  return store
}

export {
  getStoreRef,
  storeCreator as createStore,
};

function getStoreRef() {
  return store;
}

function registerProvider(provider: IProvider) {
  Object.assign(services, provider)
}

function registerSchema(name: string, schema: ISchema) {
  reducers = { ...reducers, [name]: schema }
  rootReducer = combineReducers(reducers)
}
