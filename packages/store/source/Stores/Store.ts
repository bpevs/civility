import { Action } from "redux";
import { stores } from "../Stores/Stores"

export interface IStore {
  [key: string]: any
}

export class Store implements IStore {
  public state: any = null
  public defaultState: any = null

  constructor() {
    const storeName = this.constructor.name
    this.defaultState = { ...this.state }
    this.registerStore(storeName)
  }

  public registerStore(name: string) {
    stores.registerStore(name, this)
  }

  // Each store has a single Reducer
  public onUpdate(action?: Action<any>) {
    const update = this[action.type]
    if (typeof update === "function") update(action)
  }

  get reducer() {
    return (
      prevState: any = this.defaultState,
      action: Action<any> = { type: null },
    ) => {
      this.onUpdate(action)
      return { ...this.state }
    }
  }
}
