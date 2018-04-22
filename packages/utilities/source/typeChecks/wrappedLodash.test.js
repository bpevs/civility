import { forEach } from "lodash";
import * as _ from "./wrappedLodash";


const items = [
  "s", 0, 1, "1", Infinity, null, undefined, [], [ 1 ], {},
  { 0: 1, 1: 2 }, Number, new RegExp(/fsdf/), /fsdf/, 1.5234, Math.pow(2, 53),
  new Error("hello"), NaN,
];

forEach(_, check => {
  test(check.name, () => {
    items.forEach(item => {
      expect(`${check.name}(${item}): ${check(item)}`).toMatchSnapshot()
    });
  })
});
