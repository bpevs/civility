import { shallow } from "enzyme";
import * as React from "react";
import { Nav } from "../Nav";


test("Should Render Nav with NavItems", () => {
  const wrapper = shallow(
    <Nav>
      <Nav.Item title="My Nav" href="/" />
      <Nav.Item className="my-Item">
        <Nav.Item title="my-nested-item-1" />
        <Nav.Item title="my-nested-item-2" />
      </Nav.Item>
    </Nav>
  );
  expect(wrapper).toMatchSnapshot();
});

test("Should Render Nav with className", () => {
  const wrapper = shallow(<Nav className="my-nav"></Nav>);
  expect(wrapper).toMatchSnapshot();
});
