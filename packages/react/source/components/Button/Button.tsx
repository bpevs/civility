import { classNames as cx } from "@civility/utilities"
import * as React from "react"

export type ButtonProps = React.HTMLProps<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({
  className,
  ...props
}: ButtonProps) => {
  return <button
    {...props}
    className={cx("button", className)}
  />
}
