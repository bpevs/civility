import { forEach } from "lodash"
import * as typeGuards from "./typeGuards"


const items = [
  "s", 0, 1, "1", Infinity, null, undefined, [], [ 1 ], {},
  { 0: 1, 1: 2 }, Number, new RegExp(/fsdf/), /fsdf/, 1.5234, Math.pow(2, 53),
  new Error("hello"), NaN, new Date("1/1/1")
];

forEach(typeGuards, check => {
  test(check.name, () => {
    items.forEach(item => {
      expect(`${check.name}(${item}): ${check(item)}`).toMatchSnapshot()
    })
  })
})
