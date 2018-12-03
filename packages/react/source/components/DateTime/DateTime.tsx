import * as React from "react"


export type TimeProps = React.HTMLProps<HTMLTimeElement> & {
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
  timestamp: number | string | Date,
}

const DEFAULT_OPTIONS = {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
}

export const DateTime: React.FC<TimeProps> = ({
  locale,
  options = {},
  timestamp,
  ...props
}) => {
  const date = new Date(timestamp)
  const text = date.toLocaleString(locale, { ...DEFAULT_OPTIONS, ...options })
  const dateTime = date.toISOString()

  return <time {...props} children={text} dateTime={dateTime} />
}
