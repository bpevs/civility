import * as services from "./index"

test("Should export initialize", () => {
  expect(typeof services.initialize).toBe("function")
})

test("Should export deleteUser", () => {
  expect(typeof services.deleteUser).toBe("function")
})

test("Should export getUser", () => {
  expect(typeof services.getUser).toBe("function")
})

test("Should export onAuthStateChanged", () => {
  expect(typeof services.onAuthStateChanged).toBe("function")
})

test("Should export postUser", () => {
  expect(typeof services.postUser).toBe("function")
})

test("Should export putCurrentUser", () => {
  expect(typeof services.putCurrentUser).toBe("function")
})

test("Should export signIn", () => {
  expect(typeof services.signIn).toBe("function")
})

test("Should export signOut", () => {
  expect(typeof services.signOut).toBe("function")
})
