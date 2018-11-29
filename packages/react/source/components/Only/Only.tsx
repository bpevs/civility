import * as React from "react"


export type OnlyProps = React.HTMLProps<HTMLDivElement> & {
  if: boolean,
}


export const Only: React.FC<OnlyProps> = ({
  children,
  if: onlyIf,
}: OnlyProps) => {
  return (
    <React.Fragment>
      {onlyIf ? children : ""}
    </React.Fragment>
  )
}
