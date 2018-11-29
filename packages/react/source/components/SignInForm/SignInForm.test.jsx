import { shallow } from "enzyme"
import * as React from "react"
import { SigninForm } from "./SignInForm"

test.skip("Should Render", () => {
  const wrapper = shallow(<SigninForm
    dispatch={jest.fn()}
    signinType="signIn"
  />)
  expect(wrapper).toMatchSnapshot()
})
