import { shallow } from "enzyme";
import * as React from "react";
import { Button } from "./Button";


test("Should Render Button", () => {
  const wrapper = shallow(<Button
    className="hello"
    children="My Button"
  />);
  expect(wrapper).toMatchSnapshot();
});
