import { classNames as cx, isNumber, isString } from "@civility/utilities"
import * as React from "react"


export type OnlyJSProps = React.HTMLProps<HTMLDivElement>


export const OnlyJS: React.FC<OnlyJSProps> = ({
  children,
  ...props
}) => <React.Fragment>{
  React.Children.map(children, child => {
    if (isNumber(child) || isString(child)) {
      return <span className="only-js">{child}</span>
    } else {
       const className = cx("only-js", (child as React.HTMLProps<any>).className)
       return React.cloneElement(child, { ...props, className })
    }
  })
}</React.Fragment>
