import { Component } from "../Component/Component"

/**
 * Extends React.Component
 */

export class Page extends Component {
  constructor(props: any, state: any) {
    super(props, state)

    this.stores = [ "Error", "Route" ]
  }
}
