import React from "react"
import { storiesOf } from "@storybook/react"
import { Button } from "@civility/react"

storiesOf("Button", module)
  .add("Render Button", () => (
    <Button>Hello</Button>
  ))
