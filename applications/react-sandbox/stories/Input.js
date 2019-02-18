import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Input } from "@civility/react"

storiesOf("Input")
  .add("Render Input", () => (
    <Input label="My Input" />
  ))
