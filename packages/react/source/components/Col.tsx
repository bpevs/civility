import { classNames as cx, isArray } from "@civility/utilities"
import * as React from "react"

export type colSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type colSizes = [ colSize, colSize, colSize ]

export type ColProps = React.HTMLProps<HTMLDivElement> & {
  colSize?: (colSize | colSizes),
}


export const Col: React.FC<ColProps> = ({
  className,
  colSize,
  ...props
}) => {
  const sizeClasses = isArray(colSize)
    ? sizeArrayToClassName(colSize)
    : colSize && `col col-${colSize}`

  return <div
    {...props}
    className={cx(className, sizeClasses || "col")} />
}


function sizeArrayToClassName([ sm, md, lg ]: colSizes): string {
  let className = "sm-col"

  if (sm) className += ` sm-col-${sm}`
  if (md) className += ` md-col-${md}`
  if (lg) className += ` lg-col-${lg}`

  return className
}
