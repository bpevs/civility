import { shallow } from "enzyme"
import * as React from "react"
import { DateTime } from "./DateTime"

test("Should Render from unix timestamp", () => {
  const wrapper = shallow(<DateTime
    options={{ timeZone: "UTC" }}
    timestamp={86400000}
  />)
  expect(wrapper).toMatchSnapshot()
})

test("Should Render from date string", () => {
  const wrapper = shallow(<DateTime
    timestamp="01 Jan 1970 05:05:05 GMT"
    options={{ timeZone: "UTC" }}
  />);
  expect(wrapper).toMatchSnapshot()
})
