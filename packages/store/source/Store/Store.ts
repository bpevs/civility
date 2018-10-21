import { forEach, Func, isFunction } from "@civility/utilities"
import { stores } from "../stores"


interface Actions {
  [key: string]: Func
}

interface PublicOutput {
  action: Actions
  [key: string]: any
}


export class Store {
  constructor() {
    this.registerStore()
  }

  public get() {
    const publicOutput: PublicOutput = { action: {} }

    forEach(Object.keys(this), (value: any, key: string) => {
      if (isFunction(value)) {
        publicOutput.action[key] = value
      } else {
        publicOutput[key] = value
      }
    })
  }

  private registerStore() {
    stores[this.constructor.name] = this
  }
}
