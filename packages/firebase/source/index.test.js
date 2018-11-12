import * as services from "./index"

test("Should export initialize", () => {
  expect(typeof services.initialize).toBe("function")
})


test("Should export createUser", () => {
  expect(typeof services.createUser).toBe("function")
})

test("Should export deleteUser", () => {
  expect(typeof services.deleteUser).toBe("function")
})

test("Should export onAuthStateChanged", () => {
  expect(typeof services.onAuthStateChanged).toBe("function")
})

test("Should export readUser", () => {
  expect(typeof services.readUser).toBe("function")
})

test("Should export updateAuthState", () => {
  expect(typeof services.updateAuthState).toBe("function")
})

test("Should export updateCurrentUser", () => {
  expect(typeof services.updateCurrentUser).toBe("function")
})
