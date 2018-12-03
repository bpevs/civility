import * as React from "react"


export type OnlyProps = React.HTMLProps<HTMLDivElement> & {
  if: any,
}


export const Only: React.FC<OnlyProps> = props => {
  const child = props.if ? props.children : ""
  return <React.Fragment>{child}</React.Fragment>
}
