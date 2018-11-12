import { Func } from "@civility/utilities"
import { combineReducers, Middleware } from "redux"
import { apiMiddleware, thunkMiddleware } from "../middleware/middleware"
import { Store } from "./Store"


export interface IStores {
  [key: string]: Store
}

export interface IServices {
  [key: string]: Func
}

export interface IReducers {
  [key: string]: Func
}


// Leverages Redux to hold state
export class Stores {
  public middleware: Middleware[]
  public stores: IStores
  public rootReducer?: Func
  public reducers: IReducers
  public services: IServices

  constructor() {
    this.middleware = [ apiMiddleware, thunkMiddleware ]
  }

  public registerServices(services: IServices) {
    Object.assign(this.services, services)
  }

  public registerStore(name: string, store: Store) {
    this.stores = { ...this.stores, [name]: store }
    this.rootReducer = combineReducers({
      ...this.reducers,
      [name]: store.reducer,
    })
  }
}

export const stores = new Stores()
