import * as api from "./index"


test("Should export public API", () => {
  // Components
  expect(typeof api.Background).toBe("function")
  expect(typeof api.Button).toBe("function")
  expect(typeof api.Col).toBe("function")
  expect(typeof api.DateTime).toBe("function")
  expect(typeof api.Input).toBe("function")
  expect(typeof api.Nav).toBe("function")
  expect(typeof api.NoJS).toBe("function")
  expect(typeof api.Only).toBe("function")
  expect(typeof api.OnlyJS).toBe("function")
  expect(typeof api.Row).toBe("function")
  expect(typeof api.SigninForm).toBe("function")
  expect(typeof api.Tag).toBe("function")

  // Hooks
  expect(typeof api.useFocus).toBe("function")
  expect(typeof api.useHover).toBe("function")
})
