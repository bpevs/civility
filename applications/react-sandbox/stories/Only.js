import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Only } from "@civility/react"

storiesOf("Only")
  .add("Render Only", () => (
    <Only if={true}>Hello</Only>
  ))
  .add("Render Only", () => (
    <Only if={false}>Hello</Only>
  ))
