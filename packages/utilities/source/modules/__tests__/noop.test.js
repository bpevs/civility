import { noop } from "../noop"

test("Should return `undefined`", () => {
  expect(noop()).toBe(undefined)
})
