import { shallow } from "enzyme"
import * as React from "react"
import { OnlyJS } from "./OnlyJS"

test("Should Render with only-js className", () => {
  const wrapper = shallow(<OnlyJS><span>hello</span></OnlyJS>)
  expect(wrapper).toMatchSnapshot()
})
