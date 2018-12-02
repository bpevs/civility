import { bindAll } from "./bindAll"

test("Should bind methods", () => {
  const click = jest.fn()
  const view = {
    label: "docs",
    click: function() { click(this && this.label) }
  };

  const unbound = view.click
  unbound()
  expect(click).toBeCalledWith(undefined)

  bindAll(view, [ "click" ])

  const bound = view.click
  bound()
  expect(click).toBeCalledWith("docs")
})
