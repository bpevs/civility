import { forEach, isFunction } from "lodash"
import {
  ActionType,
  createOverlay,
  deleteOverlay,
} from "./index"

test("ActionTypes should be unique strings", () => {
  const checkedTypes = {}
  forEach(ActionType, (type, index) => {
    expect(checkedTypes[index]).toBeUndefined()
    expect(typeof type).toBe("string")
    checkedTypes[index] = type
  })
})

test("Should export actionCreators", () => {
  expect(createOverlay).toBeDefined()
  expect(deleteOverlay).toBeDefined()
});
