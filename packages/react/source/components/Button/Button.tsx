import { classNames as combine } from "@civility/utilities"
import * as React from "react"

export type ButtonProps = React.HTMLProps<HTMLButtonElement>

export const Button: React.SFC<ButtonProps> = ({
  className,
  ...props
}: ButtonProps) => {
  return <button
    {...props}
    className={combine("button", className)}
  />
}
