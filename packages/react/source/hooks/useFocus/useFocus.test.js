import { shallow } from "enzyme"
import * as React from "react"
import { useFocus } from "./useFocus"

let component;


beforeEach(() => {
  component = shallow(<Component />)

  function Component() {
    const [ isFocused, bindFocus ] = useFocus()
    const hoverText = isFocused ? "focused" : "not focused"
    return <span {...bindFocus}>{hoverText}</span>
  }
})


test.skip("Should Render With focus", () => {
  expect(component.text()).toBe("not focused")
})


test.skip("Should Render new text on focus", () => {
  const span = component.find("span");
  span.simulate("focus");
  expect(span.text()).toBe("focused")
  span.simulate("blur");
  expect(span.text()).toBe("not focused")
})
