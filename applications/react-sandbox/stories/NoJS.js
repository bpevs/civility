import * as React from "react"
import { storiesOf } from "@storybook/react"
import { NoJS } from "@civility/react"

storiesOf("NoJS")
  .add("Render NoJS", () => (
    <NoJS>Hello</NoJS>
  ))
