import { classNames as cx } from "@civility/utilities"
import * as React from "react"


export type RowProps = React.HTMLProps<HTMLDivElement>


export const Row: React.FC<RowProps> = props => {
  const className = cx(props.className, "clearfix")
  return <div {...props} className={className} />
}
