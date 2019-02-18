import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Nav } from "@civility/react"

storiesOf("Nav")
  .add("Render Nav", () => (
    <Nav>
      <Nav.Item title="My Nav" href="/" />
      <Nav.Item title="WAN" href="/wan" />
      <Nav.Item title="TOO" href="/too" />
      <Nav.Item title="TREE" href="/tree" />
    </Nav>
  ))
