import { shallow } from "enzyme"
import * as React from "react"
import { DateTime } from "./DateTime"

test("Should Render from unix timestamp", () => {
  const wrapper = shallow(<DateTime timestamp={86400000} />)
  expect(wrapper).toMatchSnapshot()
})

test("Should Render from date string", () => {
  const wrapper = shallow(<DateTime timestamp="October 13, 2014 11:13:00" />);
  expect(wrapper).toMatchSnapshot()
})

test("Should accept toLocaleString options", () => {
  const wrapper = shallow(<DateTime
    options={{ timeZone: "UTC" }}
    timestamp={86400000}
  />)
  expect(wrapper).toMatchSnapshot()
})
