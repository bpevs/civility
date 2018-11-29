import { classNames as combine, isNumber, isString } from "@civility/utilities"
import * as React from "react"

export type NoJSProps = React.HTMLProps<HTMLDivElement>
export type NoJSChildProps = React.HTMLProps<any> & {
  className?: string,
}

export const NoJS: React.FC<NoJSProps> = ({
  className,
  children,
  ...props
}: NoJSProps) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isNumber(child) || isString(child)) {
      return <span className="no-js">{child}</span>
    } else {
      return React.cloneElement(child, {
        ...props,
        className: combine("no-js", (child as NoJSChildProps).className),
      })
    }
  })

  return (
    <React.Fragment>
      {childrenWithProps}
    </React.Fragment>
  )
}
