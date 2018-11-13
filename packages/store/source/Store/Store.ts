import { Func } from "@civility/utilities"
import { combineReducers, Middleware } from "redux"
import { apiMiddleware, thunkMiddleware } from "../middleware/middleware"
import { ISchema } from "../schema/schema"


export interface IProvider {
  [key: string]: Func
}

export interface IReducers {
  [key: string]: Func
}


export class Store {
  public middleware: Middleware[]
  public rootReducer?: Func
  public services: {}
  private reducers: {}

  constructor() {
    this.middleware = [ apiMiddleware, thunkMiddleware ]
  }

  public registerProvider(provider: IProvider) {
    Object.assign(this.services, provider)
  }

  public registerSchema(name: string, schema: ISchema) {
    this.reducers = { ...this.reducers, [name]: schema }
    this.rootReducer = combineReducers(this.reducers)
  }
}

export const store = new Store()
