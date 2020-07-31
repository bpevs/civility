import { shallow } from "enzyme"
import * as React from "react"
import { Input } from "../Input"

test("Should Render", () => {
  const wrapper = shallow(<Input />)
  expect(wrapper).toMatchSnapshot()
})

test("Should render with label", () => {
  const wrapper = shallow(<Input label="hello" />)
  expect(wrapper).toMatchSnapshot()
})
