import { forEach, Obj } from "@civility/utilities"
import {
  AnyAction, applyMiddleware, combineReducers, compose,
  createStore, Middleware, ReducersMapObject, Store,
} from "redux"
import { schemaMiddleware, thunkMiddleware } from "../middleware/middleware"
import { createReducerFromSchema } from "../reducerCreators/reducerCreators"
import { ISchema } from "../schemas/schemas"


function storeCreator(
  initialState: object,
  provider: Obj<any>,
  schemas: Obj<ISchema>,
): Store<any, AnyAction> {
  const reducers: ReducersMapObject = {}
  forEach(schemas, (schema, name) => {
    reducers[name] = createReducerFromSchema(initialState, schema)
  })

  const middleware: Middleware[] = [
    schemaMiddleware(schemas, provider),
    thunkMiddleware,
  ]

  return createStore(
    combineReducers(reducers),
    initialState,
    compose(applyMiddleware(...middleware)),
  )
}

export {
  storeCreator as createStore,
}
