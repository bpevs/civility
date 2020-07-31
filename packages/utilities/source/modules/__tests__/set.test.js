import { set } from "../set"

test("Should set value", () => {
  const nested = { a: { b: { c: "c" } } }
  set(nested, [ "a", "b", "c" ], "hello")

  expect(nested.a.b.c).toBe("hello")
})

test("Should set value on nonexistant path", () => {
  const nested = { a: { b: { c: "c" } } }
  set(nested, [ "d", "b", "c" ], "hello")

  expect(nested.d.b.c).toBe("hello")
})
