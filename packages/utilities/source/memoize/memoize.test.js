import { map } from ".."
import { memoize } from "./memoize"

test("Should memoize stuff", () => {
  const object = { a: 1, b: 2 }
  const other = { c: 3, d: 4 }

  const memoMap = memoize(map)

  expect(memoMap(object)).toEqual([ 1, 2 ])
  expect(memoMap(other)).toEqual([ 3, 4 ])

  object.a = 2
  expect(memoMap(object)).toEqual([ 1, 2 ])
})
