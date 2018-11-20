import * as components from "./index"


test("Should export public API", () => {
  expect(typeof components.Button).toBe("function")
  expect(typeof components.DateTime).toBe("function")
  expect(typeof components.Input).toBe("function")
})
