import { forEach } from ".."
import * as typeGuards from "./typeGuards"


const items = [
  "s", 0, 1, "1", Infinity, null, undefined, [], [ 1 ], {},
  { 0: 1, 1: 2 }, Number, new RegExp(/fsdf/), /fsdf/, 1.5234, Math.pow(2, 53),
  new Error("hello"), NaN, Date.UTC(1, 1, 1), Promise.resolve(), new Set(), new Map(),
  "/myurlorsomething", "/myregex/aa", "/myregex/"
]

forEach(typeGuards, check => {
  test(check.name, () => {
    items.forEach(item => {
      expect(`${check.name}(${item}): ${check(item)}`).toMatchSnapshot()
    })
  })
})

test("isClient returns true if window is available", () => {
  global.window = {}
  expect(typeGuards.isClient()).toBe(true)
})
