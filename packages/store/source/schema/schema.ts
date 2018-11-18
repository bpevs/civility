export interface IBehavior {
  async?: boolean
  expect?: any
  method: string
  require?: any
}

export interface ISchema {
  [key: string]: IBehavior
}
