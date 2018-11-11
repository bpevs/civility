import { forEach, Func, isFunction } from "@civility/utilities"


export interface IServices { [key: string]: Func }
const registeredServices: IServices = {}

export function registerServices(services: IServices) {
  forEach(services, (service: any) => {
    if (!isFunction(service)) throw Error("Services must be functions")
  })

  Object.assign(registeredServices, services)
}

export function getService(actionType: string) {
  return registeredServices[actionType]
}
