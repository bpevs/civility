import { Store } from "./Store"


export interface IError {
  code: number
  message: string
}

export interface IErrorAction {
  type?: "UPDATE_ERROR"
  error: IError
}


export class ErrorStore extends Store {
  public actions = {}
  public state: IError[] = []

  constructor() {
    super()
  }

  public UPDATE_ERROR() {
    this.state = { text: action.text || null }
  }

  public onUpdate(action: IErrorAction = {}) {
    if (this[action.type]) this[action.type](action)
  }
}


export const errorStore = new ErrorStore()
