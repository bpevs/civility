import * as React from "react"
import { storiesOf } from "@storybook/react"
import { DateTime } from "@civility/react"

storiesOf("DateTime")
  .add("Render DateTime", () => (
    <DateTime
      options={{ timeZone: "UTC" }}
      timestamp={86400000}
    />
  ))
