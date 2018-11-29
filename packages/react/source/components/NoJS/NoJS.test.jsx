import { shallow } from "enzyme"
import * as React from "react"
import { NoJS } from "./NoJS"

test("Should Render with no-js className", () => {
  const wrapper = shallow(<NoJS><span>hello</span></NoJS>)
  expect(wrapper).toMatchSnapshot()
})
