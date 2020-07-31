import { identity } from "../identity"

test("Should return first arg", () => {
  const a = { a: 1 }

  expect(identity(a)).toBe(a)
})
