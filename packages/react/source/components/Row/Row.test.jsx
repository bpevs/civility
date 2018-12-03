import { shallow } from "enzyme"
import * as React from "react"
import { Row } from "./Row"


test("Should Render Row", () => {
  const wrapper = shallow(<Row className="hello" children="My Row" />)
  expect(wrapper).toMatchSnapshot()
})
