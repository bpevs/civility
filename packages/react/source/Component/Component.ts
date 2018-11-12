import { Store, stores } from "@civility/store"
import React from "react"

/**
 * Extends React.Component
 */

export type ComponentCacheType = "none" | "local" | "session"


export class Component extends React.Component<any, any> {

  public cache: ComponentCacheType = "none"

  // A collection of service actions, automatically added via storeNames
  private _actions: object = {}
  private _stores: Store[] = []

  constructor(props, state) {
    super(props, state)
  }

  get stores() {
    return [ ...this._stores ]
  }

  set stores(extensions: string[]) {
    this._stores = this._stores.concat(extensions)
    this._stores.forEach(storeName => {
      this._actions = {
        ...this._actions,
        ...stores.get(storeName).actions,
      }
    })
  }
}
