import { classNames as cx } from "@civility/utilities"
import * as React from "react"
import { Only } from "../Only/Only"

export type ItemProps = React.HTMLProps<HTMLLIElement> & {
  href?: string,
  title?: string,
}

const style = "nav-item align-middle inline-block m0 list-reset"

export const Item: React.FC<ItemProps> = ({
  children,
  className,
  href,
  title,
  ...props
}: ItemProps) => {
  return (
    <li {...props} className={cx(className, style)}>
      <Only if={title}>
        { href ? <a href={href}>{title}</a> : title }
      </Only>
      <Only if={children}><ul>{children}</ul></Only>
    </li>
  )
}
