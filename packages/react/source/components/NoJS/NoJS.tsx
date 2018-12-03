import { classNames as cx, isNumber, isString } from "@civility/utilities"
import * as React from "react"


export type NoJSProps = React.HTMLProps<HTMLDivElement>


export const NoJS: React.FC<NoJSProps> = ({
  children,
  ...props
}) => <React.Fragment>{
  React.Children.map(children, child => {
    if (isNumber(child) || isString(child)) {
      return <span className="no-js">{child}</span>
    } else {
      const className = cx("no-js", (child as React.HTMLProps<any>).className)
      return React.cloneElement(child, { ...props, className })
    }
  })
}</React.Fragment>
