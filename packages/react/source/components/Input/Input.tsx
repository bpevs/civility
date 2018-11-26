import { classNames as combine, isString } from "@civility/utilities"
import * as React from "react"

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  label: React.ReactNode,
}

const inputClassName = "block col-12 input"
const labelClassName = "bold block pt2"

export const Input: React.FC<InputProps> = ({
  label: labelEl,
  ...props
}: InputProps) => {
  if (!labelEl) return <input {...props} />

  const labelComponent = isString(labelEl)
    ? <label className={labelClassName}>{labelEl}</label>
    : labelEl

  return (
    <React.Fragment>
      {labelComponent}
      <input
        {...props}
        className={combine(inputClassName, props.className)}
      />
    </React.Fragment>
  )
}
