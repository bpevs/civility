import { get } from "./get"

test("Should get value", () => {
  const nested = { a: { b: { c: "c" } } }
  expect(get(nested, [ "a", "b", "c" ])).toBe("c")
})

test("Should return default on error", () => {
  const nested = { a: { b: { c: "c" } } }
  expect(get(nested, [ "d", "b", "c" ], "hello")).toBe("hello")
})
