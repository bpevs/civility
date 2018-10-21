import { combineReducers, createStore, Dispatch, Store as ReduxStore } from "redux"
import * as defaultActionCreators from "../actions/actionCreators"
import { ActionCreator, IAction } from "../actions/actions"
import { apiMiddleware, thunkMiddleware } from "../middleware/middleware"
import * as defaultReducers from "../reducers/reducers"


type reducerFunc = (state: any, action: any) => any


interface IMiddleware {
  (...rest: any[]): any
  name: string
}

export interface IStoreOverrides {
  actionCreators?: { [key: string]: ActionCreator }
  options?: any
  middleware?: IMiddleware[]
  reducers?: { [key: string]: reducerFunc }
  services?: { [key: string]: (...args: any[]) => any }
}


export class Store implements ReduxStore<any> {
  public rootReducer?: reducerFunc
  public actionCreators: { [key: string]: ActionCreator }
  public services: { [key: string]: (...args: any[]) => any }

  public dispatch: Dispatch<IAction<any>>
  public getState: any
  public subscribe: any
  public replaceReducer: any

  private readonly internalStore: any
  private middleware: IMiddleware[]
  private readonly reducers: { [key: string]: reducerFunc }

  constructor({
    actionCreators = defaultActionCreators,
    options = {},
    middleware = [ apiMiddleware, thunkMiddleware ],
    reducers = defaultReducers,
    services = {},
  }: IStoreOverrides) {
    this.middleware = middleware || []
    this.actionCreators = actionCreators
    this.reducers = reducers
    this.services = services
    this.rootReducer = combineReducers(this.reducers)
    this.internalStore = createStore(options)
  }

  public get() {
    return { ...this.internalStore, ...this }
  }

  public appendMiddleware(middleware: IMiddleware | IMiddleware[] = []) {
    this.middleware = this.middleware.concat(Array.from(middleware))
  }

  public prependMiddleware(middleware: IMiddleware | IMiddleware[] = []) {
    this.middleware = Array.from(middleware).concat(this.middleware)
  }

  public overrideMiddleware(name: string, nextMiddleware: IMiddleware) {
    this.middleware = this.middleware.map(middleware => {
      return (name === middleware.name) ? nextMiddleware : middleware
    })
  }
}
