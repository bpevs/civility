import { shallow } from "enzyme"
import * as React from "react"
import { Col } from "./Col"


test("Should Render Col", () => {
  const wrapper = shallow(<Col
    className="hello"
    children="My Col"
  />)

  expect(wrapper).toMatchSnapshot()
})

test("Should Render Col with colSize", () => {
  const wrapper = shallow(<Col
    className="hello"
    children="My Col"
    colSize={5}
  />)

  expect(wrapper).toMatchSnapshot()
})

test("Should Render Col with breakpoint colSizes", () => {
  const wrapper = shallow(<Col
    className="hello"
    children="My Col"
    colSize={[ 1, 3, 5 ]}
  />)

  expect(wrapper).toMatchSnapshot()
})
