import { classNames as cx, isString } from "@civility/utilities"
import * as React from "react"


export type InputProps = React.HTMLProps<HTMLInputElement> & {
  label?: React.ReactNode,
}

const inputStyles = "block col-12 input"
const labelStyles = "bold block pt2"


export const Input: React.FC<InputProps> = ({
  className,
  label: labelEl,
  ...props
}) => {
  if (!labelEl) return <input {...props} />

  const labelComponent = isString(labelEl)
    ? <label className={labelStyles}>{labelEl}</label>
    : labelEl

  return (
    <React.Fragment>
      {labelComponent}
      <input {...props} className={cx(inputStyles, className)} />
    </React.Fragment>
  )
}
