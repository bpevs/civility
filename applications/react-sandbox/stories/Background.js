import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Background } from "@civility/react"

storiesOf("Background")
  .add("Render Background", () => (
    <Background color="black" fixed>{"hello"}</Background>
  ))
