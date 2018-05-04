import * as React from "react"

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
}

export const Button: React.StatelessComponent<ButtonProps> = ({
  ...props,
}) => {
  return <button {...props} />
}
