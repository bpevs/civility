import { classNames as cx } from "@civility/utilities"
import * as React from "react"


export type TagProps = React.HTMLProps<HTMLSpanElement>
const styles = "tag h6 border rounded ml1"


export const Tag: React.FC<TagProps> = props => {
  const className = cx(props.className, styles)
  return <span {...props} className={className} />
}
