import * as React from "react"


export interface ITimeOptions {
  day?: "numeric" | "2-digit"
  era?: "narrow" | "short" | "long"
  formatMatcher?: "basic" | "best fit"
  hour?: "numeric" | "2-digit"
  hour12?: true | false
  hourCycle?: "h11" | "h12" | "h23" | "h24"
  localeMatcher?: "lookup" | "best fit"
  minute?: "numeric" | "2-digit"
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long"
  second?: "numeric" | "2-digit"
  timeZone?: string
  timeZoneName?: "short" | "long"
  weekday?: "narrow" | "short" | "long"
  year?: "numeric" | "2-digit"
}

export type TimeProps = React.HTMLProps<HTMLTimeElement> & {
  locale?: string,
  options?: ITimeOptions,
  timestamp: number | string | Date,
}

const DEFAULT_OPTIONS = {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
}

export const DateTime: React.SFC<TimeProps> = ({
  locale,
  options = {},
  timestamp,
  ...props
}: TimeProps) => {
  const date = new Date(timestamp)
  const text = date.toLocaleString(locale, { ...DEFAULT_OPTIONS, ...options })
  const dateTime = date.toISOString()

  return <time {...props} children={text} dateTime={dateTime} />
}
