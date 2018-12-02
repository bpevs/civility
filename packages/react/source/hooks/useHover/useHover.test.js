import { shallow } from "enzyme"
import * as React from "react"
import { useHover } from "./useHover"

let component;


beforeEach(() => {
  component = shallow(<Component />)

  function Component() {
    const [ isHovered, bindHover ] = useHover()
    const hoverText = isHovered ? "hovered" : "not hovered"
    return <span {...bindHover}>{hoverText}</span>
  }
})


test.skip("Should Render With hover", () => {
  expect(component.text()).toBe("not hovered")
})


test.skip("Should Render new text on hover", () => {
  const span = component.find("span");
  span.simulate("mouseenter");
  expect(span.text()).toBe("hovered")
  span.simulate("mouseleave");
  expect(span.text()).toBe("not hovered")
})
