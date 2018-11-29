import { classNames as combine, isNumber, isString } from "@civility/utilities"
import * as React from "react"

export type OnlyJSProps = React.HTMLProps<HTMLDivElement>
export type OnlyJSChildProps = React.HTMLProps<any> & {
  className?: string,
}

export const OnlyJS: React.FC<OnlyJSProps> = ({
  className,
  children,
  ...props
}: OnlyJSProps) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isNumber(child) || isString(child)) {
      return <span className="only-js">{child}</span>
    } else {
      return React.cloneElement(child, {
        ...props,
        className: combine("only-js", (child as OnlyJSChildProps).className),
      })
    }
  })

  return (
    <React.Fragment>
      {childrenWithProps}
    </React.Fragment>
  )
}
