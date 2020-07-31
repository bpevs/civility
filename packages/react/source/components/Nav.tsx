import { classNames as cx } from "@civility/utilities"
import * as React from "react"
import { Item, ItemProps } from "./NavItem"


export type NavProps = React.HTMLProps<HTMLDivElement>
export type NavComponent = React.FC<NavProps> & {
  Item?: React.FC<ItemProps>,
}


const navStyle = "nav list-reset align-middle"
const ulStyle = "m0"


const Nav: NavComponent = ({ children, className, ...props }) => {
  return (
    <nav {...props} className={cx(navStyle, className)}>
      <ul className={ulStyle}>{children}</ul>
    </nav>
  )
}

Nav.Item = Item

export { Nav }
