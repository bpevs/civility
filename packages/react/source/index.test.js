import * as components from "./index"

test("Should export Button", () => {
  expect(typeof components.Button).toBe("function")
})

test("Should export DateTime", () => {
  expect(typeof components.DateTime).toBe("function")
})

test("Should export Input", () => {
  expect(typeof components.Input).toBe("function")
})
