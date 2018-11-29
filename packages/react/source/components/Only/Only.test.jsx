import { shallow } from "enzyme"
import * as React from "react"
import { Only } from "./Only"

test("Should be empty when `if` is false", () => {
  const wrapper = shallow(<Only if={false}>hello</Only>)
  expect(wrapper).toMatchSnapshot()
})

test("Should be identity when `if` is true", () => {
  const wrapper = shallow(<Only if={true}>hello</Only>)
  expect(wrapper).toMatchSnapshot()
})
