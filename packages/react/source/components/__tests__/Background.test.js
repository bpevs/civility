import { shallow } from "enzyme"
import * as React from "react"
import { Background } from "../Background"

test.skip("Should Render w/o props", () => {
  const wrapper = shallow(<Background className="hello" />)
  expect(wrapper).toMatchSnapshot()
})

test.skip("Should Render with color prop", () => {
  const wrapper = shallow(<Background color="#000" />)
  expect(wrapper).toMatchSnapshot()
})

test.skip("Should Render with image prop", () => {
  const url = "https://static.bpev.me/content/blog/tech/favioli/large/comparison.png"
  const wrapper = shallow(<Background src={url} />)
  expect(wrapper).toMatchSnapshot()
})

test.skip("Should render with fixed position", () => {
  const wrapper = shallow(<Background fixed />)
  expect(wrapper).toMatchSnapshot()
})

test.skip("Should be able to pass custom transition ms", () => {
  const wrapper = shallow(<Background transitionSpeed={500} />)
  expect(wrapper).toMatchSnapshot()
})
