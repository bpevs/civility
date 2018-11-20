import * as services from "./index"


test("Should export public API", () => {
  expect(typeof services.deleteUser).toBe("function")
  expect(typeof services.getUser).toBe("function")
  expect(typeof services.initialize).toBe("function")
  expect(typeof services.onAuthStateChanged).toBe("function")
  expect(typeof services.postUser).toBe("function")
  expect(typeof services.putCurrentUser).toBe("function")
  expect(typeof services.signIn).toBe("function")
  expect(typeof services.signOut).toBe("function")
})
